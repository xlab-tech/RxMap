
const registerActions = {};

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
};

/**
 * Recupera la informacion adicional del comando a partir de su nombre
 * @param {string} actionName
 * @return {object}
 */
export const getActionInfo = actionName => (registerActions[actionName] ? registerActions[actionName].options : false);

/**
 * Recupera el comando a partir de su nombre
 * @param {string} actionName
 * @return {Function}
 */
export const getAction = actionName => (registerActions[actionName] ? registerActions[actionName].action : false);

/**
 * Recupera la lista de comandos registrados
 * @return {Array<String|action>}
 */
export const getAllCommandsName = () => Object.keys(registerActions);
