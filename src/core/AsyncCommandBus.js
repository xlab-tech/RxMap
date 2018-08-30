import { from } from 'rxjs/internal/observable/from';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import CommandBus from './CommandBus';
import { setAsyncCommandBus } from './registerOperator';
import { getAction } from './registerAction';
import { applyMiddlewares } from './middlewares';

class AsyncCommandBus extends CommandBus {
  constructor() {
    super();
    this.queue = [];
    this.subscribers = [];
    this.allResults = [];
  }

  setSource(source) {
    this._source = source;
  }

  setActionsSubject(actionsSubject) {
    this._actionsSubject = actionsSubject;
  }

  getSource() {
    return this._source;
  }

  getContext() {
    return this._source.getContext(this._lastAction);
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
        .pipe(switchMap(() => super.observer(observerName, ...args)));
    }
    return super.observer(observerName, ...args);
  }
}

export const setProxy = obj => new Proxy(obj, {
  get: (target, name, receiver) => {
    // if (!Object.prototype.hasOwnProperty.call(target, name)) {
    if (!(name in target)) {
      const action = getAction(name);
      if (!action) {
        return Reflect.get(target, name, receiver);
      }
      const actionExecute = applyMiddlewares(name, action);
      return (...args) => {
        let _this = receiver;
        if (!(target instanceof AsyncCommandBus)
          && (name !== 'create')) {
          _this = AsyncCommandBus.lift(_this, _this._actionsSubject);
        }
        _this.execute(name, actionExecute, args);
        return _this;
      };
    }
    return Reflect.get(target, name, receiver);
  },
});

AsyncCommandBus.lift = function (source, actionsSubject) {
  const bus = new AsyncCommandBus();
  bus.setSource(source);
  bus.setActionsSubject(actionsSubject);
  return setProxy(bus);
};

setAsyncCommandBus(AsyncCommandBus);

export default AsyncCommandBus;
