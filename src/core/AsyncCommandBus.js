import { from } from 'rxjs/internal/observable/from';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import CommandBus from './CommandBus';
import { setAsyncCommandBus } from './registerOperator';

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

  setCommandsSubject(commandsSubject) {
    this._commandsSubject = commandsSubject;
  }

  getSource() {
    return this._source;
  }

  getContext() {
    return this._source.getContext(this._lastCommand);
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
    this.allResults.push(res.value);
    return res;
  }

  _next() {
    if (this.queue.length === 0) {
      this._complete();
      return;
    }
    const params = this.queue.shift();
    this._execute(params.commandName, params.command, params.args).subscribe((value) => {
      this._next(value);
    });
  }

  _complete() {
    this.subscribers.map(f => f(this._lastCommand, this.allResults));
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

AsyncCommandBus.lift = function (source, commandsSubject) {
  const bus = new AsyncCommandBus();
  bus.setSource(source);
  bus.setCommandsSubject(commandsSubject);
  return bus;
};

export const createFunctionInCommandBus = (commandName, commandExecute) => {
  CommandBus.prototype[commandName] = function (...args) {
    let _this = this;
    if (!(_this instanceof AsyncCommandBus)
      && (commandName !== 'create')) {
      _this = AsyncCommandBus.lift(_this, _this._commandsSubject);
    }
    _this.execute(commandName, commandExecute, args);
    return _this;
  };
};


setAsyncCommandBus(AsyncCommandBus);

export default AsyncCommandBus;
