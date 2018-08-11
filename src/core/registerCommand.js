import { applyMiddlewares as applyMiddlewaresAtCommand, registerMiddlewares } from './middlewares';
import registerOperator from './registerOperator';
import AsyncCommandBus from './AsyncCommandBus';
import CommandBus from './CommandBus';

const registerCommands = {};

const isAsyncCommandBus = function (value) {
  return value && typeof value.subscribe === 'function' && typeof value.execute === 'function';
};

const _registerCommand = (commandName, command) => {
  const commandExecute = applyMiddlewaresAtCommand(commandName, command);
  CommandBus.prototype[commandName] = function (...args) {
    let _this = this;
    if (!(isAsyncCommandBus(_this))
      && (commandName !== 'create' || (commandName === 'create' && this.createAsync))) {
      _this = AsyncCommandBus.lift(this);
    }
    _this.execute(commandName, commandExecute, args);
    return _this;
  };
  registerOperator(commandName, commandExecute);
};

const registerWithMiddleware = (commandName) => {
  const commandValue = registerCommands[commandName].command;
  if (!commandValue) {
    throw new Error(`Command ${commandName} not registered`);
  }
  _registerCommand(commandName, commandValue);
};

export const registerCommand = (commandName, command, options = {}) => {
  // if (CommandBus.prototype[commandName]) {
  //    throw `Command ${commandName} yet registered`
  // }

  registerCommands[commandName] = { command, options };

  _registerCommand(commandName, command);
};

export const getCommandInfo = commandName => registerCommands[commandName].options;

export const applyMiddlewares = (commandName, ...middlewares) => {
  registerMiddlewares(commandName, middlewares);
  if (typeof commandName === 'string') {
    registerWithMiddleware(commandName);
  } else {
    Object.keys(registerCommands).forEach(key => registerWithMiddleware(key));
  }
};

export default registerCommand;
