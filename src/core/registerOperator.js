
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import isPromise from '../utils/isPromise';

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

const getArgs = (param, value) => {
  let args = param;
  if (typeof param === 'function') {
    args = param(value);
  }
  if (args && !Array.isArray(args)) {
    args = [args];
  }
  return args;
};

const registerOperator = (commandName, command) => {
  Observable.prototype[commandName] = function (someCallback) {
    const commandBus = getCommandBus(this);

    return this.pipe(mergeMap((value) => {
      const args = getArgs(someCallback, value);
      const result = commandBus.execute(commandName, command, args);

      if (!isPromise(result)) {
        return of(result);
      }
      return from(result);
    }));
  };
};

export default registerOperator;
