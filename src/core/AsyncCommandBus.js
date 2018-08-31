import { from } from 'rxjs/internal/observable/from';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import CommandBus from './CommandBus';

class AsyncCommandBus extends CommandBus {
  constructor() {
    super();
    this.queue = [];
    this.subscribers = [];
    this.allResults = [];
  }

  execute(actionName, action, args) {
    this.queue.push({
      actionName,
      action,
      args,
    });
    if (this.queue.length === 1) {
      this._executingAction = actionName;
      setTimeout(() => this._next(), 1);
    }
  }

  _saveExecution(actionName, result) {
    const res = super._saveExecution(actionName, result);
    this.allResults.push(res.value);
    return res;
  }

  _next() {
    if (this.queue.length === 0) {
      this._complete();
      return;
    }
    const params = this.queue.shift();
    this._execute(params.actionName, params.action, params.args).subscribe((value) => {
      this._next(value);
    });
  }

  _complete() {
    this.subscribers.map(f => f(this._lastAction, this.allResults));
  }

  subscribe(func) {
    this.subscribers.push(func);
  }

  getValue() {
    if (this.isExecuting()) {
      return from(new Promise(resolve => this.subscribe((res) => {
        resolve(res);
      })));
    }
    return super.getValue();
  }

  observer(observerName, ...args) {
    if (this.isExecuting()) {
      return from(new Promise(resolve => this.subscribe(resolve)))
        .pipe(switchMap(() => this._source.observer(observerName, ...args)));
    }
    return this._source.observer(observerName, ...args);
  }
}

AsyncCommandBus.lift = function (source, actionsSubject) {
  const bus = new AsyncCommandBus();
  bus.setSource(source);
  bus.setActionsSubject(actionsSubject);
  return bus;
};

export default AsyncCommandBus;
