
const registerActions = {};

/**
 * Permite registrar las acciones que luego se podra utilizar en @link {RxMap}
 * o desde los Observadores
 *  * @example
 *  // Registrar accion
 *  registerAction'test',arg=>console.log(arg));
 *
 *  // Utilizar el comando
 *  RxMap.test('asasfasdf');
 *  RxMap.fromObserver(from(5)).test('asfadf').subscribe(console.log)
 *
 * @param {string} actionName Nombre de la accion a regitrar
 * @param {function} action Action a ejecutar
 * @param {object} [options] Opciones para la accion
 */
export const registerAction = (actionName, action, options = {}) => {
  registerActions[actionName] = { action, options };
};

/**
 * Recupera la informacion adicional de la acción a partir de su nombre
 * @param {string} actionName
 * @return {object}
 * @private
 */
export const getActionInfo = actionName => (registerActions[actionName] ? registerActions[actionName].options : false);

/**
 * Recupera la acción a partir de su nombre
 * @param {string} actionName
 * @return {Function}
 * @private
 */
export const getAction = actionName => (registerActions[actionName] ? registerActions[actionName].action : false);

/**
 * Recupera la lista de acciones registradas
 * @return {Array<String|action>}
 */
export const getAllActionsName = () => Object.keys(registerActions);
