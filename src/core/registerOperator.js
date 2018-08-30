import { concatMap } from 'rxjs/internal/operators/concatMap';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { getAction } from './registerAction';

let AsyncCommandBus = null;

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

const getCommandBus = (observable) => {
  const commandBus = observable._commandBus;
  if (commandBus) {
    return commandBus;
  }
  if (observable.source) {
    return getCommandBus(observable.source);
  }
  return null;
};


export const setProxy = obj => new Proxy(obj, {
  get: (target, name, receiver) => {
    if (!(name in target)) {
      const action = getAction(name);
      switch (name) {
        case 'setCommandBus':
          return (commandBus) => {
            if (commandBus instanceof AsyncCommandBus) {
              // eslint-disable-next-line
              target._commandBus = commandBus;
            } else {
              // eslint-disable-next-line
              target._commandBus = AsyncCommandBus.lift(commandBus, commandBus._actionsSubject);
            }
            return receiver;
          };
        case 'getCommandBus':
          return () => target._commandBus;
        case 'observer':
          return (observerName, ...args) => {
            const commandBus = getCommandBus(target);
            return receiver.pipe(mergeMap(() => commandBus.observer(observerName, ...args)));
          };
        default:
          if (!action) {
            return Reflect.get(target, name, receiver);
          }
          return (someCallback) => {
            const commandBus = getCommandBus(target);
            return receiver.pipe(concatMap((value) => {
              const args = getArgs(someCallback, value);
              const result = commandBus[name](...args);
              return result.getValue();
            }));
          };
      }
    }
    if (name === 'pipe') {
      return new Proxy(Reflect.get(target, name, receiver), {
        apply: (targetPipe, receiverPipe, args) => {
          const observer = Reflect.apply(targetPipe, receiverPipe, args);
          const { _commandBus } = target;
          if (!_commandBus) {
            return observer;
          }
          observer._commandBus = _commandBus;
          return setProxy(observer);
        },
      });
    }
    return Reflect.get(target, name, receiver);
  },
});

export const setAsyncCommandBus = (AsyncCommandBusClass) => { AsyncCommandBus = AsyncCommandBusClass; };
