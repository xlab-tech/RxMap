
import { Subject } from 'rxjs/internal/Subject';
import { filter } from 'rxjs/internal/operators/filter';
import { getAction } from './registerAction';
import { applyMiddlewares } from './middlewares';
import AsyncCommandBus from './AsyncCommandBus';
import CommandBus from './CommandBus';
import { observerFrom } from './proxyObservable';
/**
 * Funcion que permite observar la execucion de cualquir
 * comando y obtener su respuesta,
 * Se puede pasar un nombre o una expresion regular para poder
 * observar mas de un comando o todos.
 *
 * @param {String} actionName Nombre o Regex a evaluar
 * @return Observer
 */
const observerAction = target => actionName => target._actionsSubject.pipe(filter(lastAction => lastAction.name.match(actionName)));

/**
* @private
*/
const _actionsSubject = (target) => {
  if (!target._actionsSubject) {
    // eslint-disable-next-line
    target._actionsSubject = new Subject();
  }
  return target._actionsSubject;
};

/**
 *
 * @param {*} action
 * @param {*} target
 * @param {*} name
 * @param {*} receiver
 * @private
 */
const _executeAction = (action, target, name, receiver) => (...args) => {
  let _target = target;
  let _receiver = receiver;
  if (!(target instanceof AsyncCommandBus)) {
    if (name !== 'create') { // TODO: hacer esto de otra manera
      // eslint-disable-next-line
      _target = target._source || setProxy(target);
      _target = AsyncCommandBus.lift(_target, _target._actionsSubject);
    } else {
      _target = target._commandBus || new CommandBus();
      // eslint-disable-next-line
      target._commandBus = _target;
      _target._source = receiver;
      _target._actionsSubject = receiver._actionsSubject;
    }
    // eslint-disable-next-line
    _receiver = setProxy(_target);
  }

  const _action = applyMiddlewares(name, action);
  _target.execute(name, _action, args);

  return _receiver;
};

const setProxy = obj => new Proxy(obj, {
  get: (target, name, receiver) => {
    if (!(name in target)) {
      let action;
      switch (name) {
        case '_actionsSubject':
          return _actionsSubject(target);
        case 'observer':
          return observerFrom(target._commandBus);
        case 'observerAction':
          return observerAction(target);
        default:
          action = getAction(name);
          if (!action) {
            return Reflect.get(target, name, receiver);
          }
          return _executeAction(action, target, name, receiver);
      }
    }
    return Reflect.get(target, name, receiver);
  },
});

export default setProxy;
