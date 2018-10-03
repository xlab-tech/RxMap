/**
 * @private
 */
const _middlewares = {
  _global: [],
};

/**
 * @private
 */
const _subscribers = [];

/**
 * @private
 */
const compose = (action, ...funcs) => {
  if (funcs.length === 0) {
    return action;
  }
  if (funcs.length === 1) {
    return funcs[0](action);
  }
  return funcs.reduce((a, b) => a(b(action)));
};

/**
 *
 * @param {*} action
 * @private
 */
const executeAction = action => (commandBus, args) => action(commandBus.getContext())(...args);

/**
 *
 * @param {*} actionName
 * @param {*} action
 * @private
 */
export const applyMiddlewares = (actionName, action) => {
  let middlewares = _middlewares._global;
  if (_middlewares[actionName]) {
    middlewares = _middlewares._global.concat(_middlewares[actionName]);
  }
  return compose(executeAction(action), ...middlewares);
};

/**
*
* funcion que permite registar los middlewares, para realizar acciones antes y depués de
* ejecutar una acción, se puden pasar mas de un middlleware .
* El primer parametro es opcional y es el nombre de la acción sobre la que se va a aplicar
* el middleware, si no se pasa ningun nombre se aplicará sobre todas las acciones.
*
* @example
* registerMiddleware('test',middleware1,middleware2);
* @example
* registerMiddleware(middleware1,middleware2);
*
* Las funciones del midleware son funciones que revien la accion a ejecutar y devuelve una
* función async que recibe como parametro el CommandBus y un array con los argumentos
* La función tiene que hacer lo que quiera, ejecutar la acción, volver a ejecutar el código
* que desee y devolver el resultado de la acción ejecutada.
*
* @example
* const LoggerMiddleware = next => async (Map, args) => {
*  const actionName = Map.getActionName();
*  const now = new Date().getTime();
*  const name = `Command ${actionName} [${now}]: `;
*  console.log(`Pre ${name}`, args);
*  const res = await next(Map, args);
*  console.log(`Post ${name}`, res);
*  return res;
* };
* registerMiddleware(LoggerMiddleware);
*
*/
export const registerMiddleware = (actionName, ...middlewares) => {
  if (!actionName) {
    return;
  }
  if (typeof actionName === 'string') {
    _middlewares[actionName] = middlewares;
    _subscribers.forEach(func => func(actionName));
    return;
  }
  _middlewares._global = [actionName, ...middlewares];
  _subscribers.forEach(func => func());
};

export const subscribe = func => _subscribers.push(func);
