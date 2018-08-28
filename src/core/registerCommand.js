import { applyMiddlewares, subscribe } from './middlewares';
import registerOperator from './registerOperator';
import { createFunctionInCommandBus } from './AsyncCommandBus';

const registerCommands = {};

const _registerCommand = (commandName, command) => {
  const commandExecute = applyMiddlewares(commandName, command);
  createFunctionInCommandBus(commandName, commandExecute);
  registerOperator(commandName, commandExecute);
};

/**
 * Permite registrar los comandos que luego se podra utilizar en @link {RxMap}
 * o desde los Observadores
 *  * @example
 *  // Registrar comando
 *  registerCommand('test',arg=>console.log(arg));
 *
 *  // Utilizar el comando
 *  RxMap.test('asasfasdf');
 *  RxMap.fromObserver(from(5)).test('asfadf').subscribe(console.log)
 *
 * @param {string} commandName Nombre del comando a regitrar
 * @param {function} command Commando a ejecutar
 * @param {object} [options] Opciones para el comando
 */
export const registerCommand = (commandName, command, options = {}) => {
  registerCommands[commandName] = { command, options };
  _registerCommand(commandName, command);
};

/**
 * Recupera la informacion adicional del comando a partir de su nombre
 * @param {string} commandName
 * @return {object}
 */
export const getCommandInfo = commandName => registerCommands[commandName].options;

/**
 * Recupera el comando a partir de su nombre
 * @param {string} commandName
 * @return {Function}
 */
export const getCommand = commandName => registerCommands[commandName].command;

/**
 * Recupera la lista de comandos registrados
 * @return {Array<String|command>}
 */
export const getAllCommandsName = () => Object.keys(registerCommands);

const updateCommandWithMiddleware = (commandName) => {
  const commandValue = registerCommands[commandName];
  if (commandValue) {
    _registerCommand(commandName, commandValue.command);
  }
};

subscribe((commandName) => {
  if (typeof commandName === 'string') {
    updateCommandWithMiddleware(commandName);
  } else {
    Object.keys(registerCommands).forEach(key => updateCommandWithMiddleware(key));
  }
});

export default registerCommand;
