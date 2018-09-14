import { concatMap } from 'rxjs/internal/operators/concatMap';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { from } from 'rxjs/internal/observable/from';
import { getAction } from './registerAction';
import { applyMiddlewares } from './middlewares';
import AsyncCommandBus from './AsyncCommandBus';
import { getObserver } from './registerObserver';

/**
 *
 * @param {*} param Parametros que se envian al observador
 * @param {*} value Valor de la ultima ejecución
 * @private
 */
const getArgs = (param, value) => {
  let args = param;
  if (!args) {
    return [];
  }
  if (typeof param === 'function') {
    args = param(value);
  }
  if (args && !Array.isArray(args)) {
    args = [args];
  }
  return args;
};

/**
 * @private
 */
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

/**
 * Función que aplicar las funcionalidades necesarios en el observador a través de un Proxy
 * @param {object} obj Elemento a aplicar
 * @private
 */
const setProxy = obj => new Proxy(obj, {
  get: (target, name, receiver) => {
    if (!(name in target)) {
      let action;
      let _target;
      switch (name) {
        case 'setCommandBus': // TODO: Pensar si esto se pude hacer diferente para sacar de aqui la dependencia con AsyncCommandBus
          return (commandBus) => {
            if (commandBus instanceof AsyncCommandBus) {
              // eslint-disable-next-line
              target._commandBus = commandBus;
            } else {
              _target = commandBus._source || commandBus;
              // eslint-disable-next-line
              target._commandBus = AsyncCommandBus.lift(_target, _target._actionsSubject);
            }
            return receiver;
          };
        case 'getCommandBus':
          return () => target._commandBus;
        case 'observer':
          return (observerName, ...args) => {
            const commandBus = getCommandBus(target);
            // eslint-disable-next-line
            return receiver.pipe(mergeMap(() => observerFrom(commandBus)(observerName, ...args)));
          };
        default:
          action = getAction(name);
          if (!action) {
            return Reflect.get(target, name, receiver);
          }
          return (someCallback) => {
            const commandBus = getCommandBus(target);
            return receiver.pipe(concatMap((value) => {
              const args = getArgs(someCallback, value);
              const _action = applyMiddlewares(name, action);
              commandBus.execute(name, _action, args);
              return commandBus.getValue();
            }));
          };
      }
    }
    if (name === 'pipe') {
      return new Proxy(Reflect.get(target, name, receiver), {
        apply: (targetPipe, receiverPipe, args) => {
          const _observer = Reflect.apply(targetPipe, receiverPipe, args);
          const { _commandBus } = target;
          if (!_commandBus) {
            return _observer;
          }
          _observer._commandBus = _commandBus;
          return setProxy(_observer);
        },
      });
    }
    return Reflect.get(target, name, receiver);
  },
});

/**
 *
 * @param {Observer} observer
 * @param {CommandBus} CommandBus
 * @private
 */
const _applyCommandBus = (observer, CommandBus) => {
  const _observer = setProxy(observer);
  return _observer.setCommandBus(CommandBus.getSource());
};

/**
 *
 * Funcion que puede recibir un string con el nombre del
 * obsevador que se quiere recuperar de los registrados
 * o que puede recibir un Array, una promesa o un Iterable
 * o otro Observebable
 * sobre el que devuelve un observable con el CommandBus
 * aplicado para poder invocar los comandos.
 *
 * Al observador se le pueden pasar los argumentos que necesite.
 *
 * @example
 *  // String
 *
 * RxMap.observer('test')
 *  .example('test')
 *  .subscribe(console.log);
 * @example
 *  // Array
 * RxMap.observer([1,2,3,4,5])
 *  .example('test')
 *  .subscribe(console.log);
 * @example
 *
 * const $stream = from(['a','b','c']);
 * RxMap.observer($stream)
 *  .example('test')
 *  .subscribe(console.log);
 *
 * @param {string|Array|Promise|Iterable|Observer} observerName
 * @param  {...any} args
 * @return {Observer}
 */
export const observerFrom = commandBus => (observerName, ...args) => {
  if (typeof observerName !== 'string') {
    const obser = from(observerName);
    return _applyCommandBus(obser, commandBus);
  }
  const observer = getObserver(observerName);
  if (!observer) {
    throw new Error(`Observer ${observerName} not register`);
  }
  const obser = observer(commandBus.getContext(), ...args);
  return _applyCommandBus(obser, commandBus);
};

export default setProxy;
