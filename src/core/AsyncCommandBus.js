import { from } from 'rxjs/internal/observable/from';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import CommandBus from './CommandBus';
import isPromise from '../utils/isPromise';

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

  setMap(map) {
    if (map) {
      if (this._source) {
        this._source.setMap(map);
      }
      super.setMap(map);
    }
  }

  execute(commandName, command, args) {
    this.queue.push({
      commandName,
      command,
      args,
    });
    if (this.queue.length === 1) {
      this._executingCommand = commandName;
      setTimeout(() => this._next(), 1);
    }
  }

  _saveExecution(commandName, result) {
    const res = super._saveExecution(commandName, result);
    this.allResults.push(res);
    return res;
  }

  _next() {
    if (this.queue.length === 0) {
      this._complete();
      return;
    }
    const params = this.queue.shift();
    const ret = this._execute(params.commandName, params.command, params.args);
    if (isPromise(ret)) {
      ret.then(() => this._next());
      return;
    }
    this._next();
  }

  _complete() {
    this.subscribers.map(f => f(this._lastCommand, this.allResults));
  }

  subscribe(func) {
    this.subscribers.push(func);
  }

  observer(observerName, ...args) {
    if (this.isExecuting()) {
      return from(new Promise(resolve => this.subscribe(resolve)))
        .pipe(switchMap(() => super.observer(observerName, ...args)));
    }
    return super.observer(observerName, ...args);
  }
}

AsyncCommandBus.lift = function (map, source) {
  const bus = new AsyncCommandBus();
  bus.setMap(map);
  bus.setSource(source);
  return bus;
};

export default AsyncCommandBus;
