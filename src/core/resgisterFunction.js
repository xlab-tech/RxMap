
const registerFunctions = {};

/**
 * Permite registrar las funciones que luego se podra utilizar en @link {RxMap}
 *
 *  * @example
 *  // Registrar accion
 *  registerFunction'test',arg=>console.log(arg));
 *
 *  // Utilizar el comando
 *  RxMap.test('asasfasdf');
 *
 * @param {string} funcitonName Nombre de la accion a regitrar
 * @param {function} action Action a ejecutar
 * @param {object} [options] Opciones para la accion
 */
export const registerFunction = (funcitonName, action, options = {}) => {
  registerFunctions[funcitonName] = { action, options };
};

/**
 * Recupera la informacion adicional de la funcion a partir de su nombre
 * @param {string} functionName
 * @return {object}
 * @private
 */
export const getFunctionInfo = functionName => (registerFunctions[functionName] ? registerFunctions[functionName].options : false);

/**
 * Recupera la funcion a partir de su nombre
 * @param {string} funcitonName
 * @return {Function}
 * @private
 */
export const getFunction = funcitonName => (registerFunctions[funcitonName] ? registerFunctions[funcitonName].action : false);

/**
 * Recupera la lista de funciones registradas
 * @return {Array<String|action>}
 */
export const getAllFuctionsName = () => Object.keys(registerFunctions);
