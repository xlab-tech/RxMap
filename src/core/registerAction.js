import { applyMiddlewares, subscribe } from './middlewares';
import registerOperator from './registerOperator';
import { createFunctionInCommandBus } from './AsyncCommandBus';

const registerActions = {};

const _registerAction = (actionName, action) => {
  const actionExecute = applyMiddlewares(actionName, action);
  createFunctionInCommandBus(actionName, actionExecute);
  registerOperator(actionName, actionExecute);
};

/**
 * Permite registrar los comandos que luego se podra utilizar en @link {RxMap}
 * o desde los Observadores
 *  * @example
 *  // Registrar comando
 *  registerAction'test',arg=>console.log(arg));
 *
 *  // Utilizar el comando
 *  RxMap.test('asasfasdf');
 *  RxMap.fromObserver(from(5)).test('asfadf').subscribe(console.log)
 *
 * @param {string} actionName Nombre del comando a regitrar
 * @param {function} action Action a ejecutar
 * @param {object} [options] Opciones para el comando
 */
export const registerAction = (actionName, action, options = {}) => {
  registerActions[actionName] = { action, options };
  _registerAction(actionName, action);
};

/**
 * Recupera la informacion adicional del comando a partir de su nombre
 * @param {string} actionName
 * @return {object}
 */
export const getActionnfo = actionName => registerActions[actionName].options;

/**
 * Recupera el comando a partir de su nombre
 * @param {string} actionName
 * @return {Function}
 */
export const getAction = actionName => registerActions[actionName].action;

/**
 * Recupera la lista de comandos registrados
 * @return {Array<String|action>}
 */
export const getAllCommandsName = () => Object.keys(registerActions);

const updateActionithMiddleware = (actionName) => {
  const actionValue = registerActions[actionName];
  if (actionValue) {
    _registerAction(actionName, actionValue.action);
  }
};

subscribe((actionName) => {
  if (typeof actionName === 'string') {
    updateActionithMiddleware(actionName);
  } else {
    Object.keys(registerActions).forEach(key => updateActionithMiddleware(key));
  }
});
