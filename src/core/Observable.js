
import { Observable } from 'rxjs/internal/Observable';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

const getCommandBus = (source) => {
  const commandBus = source.getCommandBus();
  if (commandBus) {
    return commandBus;
  }
  if (source.source) {
    return getCommandBus(source.source);
  }
  return null;
};

Observable.prototype.setCommandBus = function (commandBus) {
  this._commandBus = commandBus;
  return this;
};

Observable.prototype.getCommandBus = function () {
  return this._commandBus;
};

Observable.prototype.observer = function (observerName, ...args) {
  const commandBus = getCommandBus(this);
  return this.pipe(mergeMap(() => commandBus.observer(observerName, ...args)));
};
