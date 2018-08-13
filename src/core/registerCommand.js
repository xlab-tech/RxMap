import { applyMiddlewares as applyMiddlewaresAtCommand, registerMiddlewares } from './middlewares';
import registerOperator from './registerOperator';
import AsyncCommandBus from './AsyncCommandBus';
import CommandBus from './CommandBus';

const registerCommands = {};

const isAsyncCommandBus = function (value) {
  return value && typeof value.subscribe === 'function' && typeof value.execute === 'function';
};

const createFunctionInCommandBus = (commandName, commandExecute) => {
  CommandBus.prototype[commandName] = function (...args) {
    let _this = this;
    if (!(isAsyncCommandBus(_this))
      && (commandName !== 'create' || (commandName === 'create' && this.createAsync))) {
      _this = AsyncCommandBus.lift(this);
    }
    _this.execute(commandName, commandExecute, args);
    return _this;
  };
};

const _registerCommand = (commandName, command) => {
  const commandExecute = applyMiddlewaresAtCommand(commandName, command);
  createFunctionInCommandBus(commandName, commandExecute);
  registerOperator(commandName, commandExecute);
};

const registerWithMiddleware = (commandName) => {
  const commandValue = registerCommands[commandName];
  if (commandValue) {
    _registerCommand(commandName, commandValue.command);
  }
};

export const registerCommand = (commandName, command, options = {}) => {
  registerCommands[commandName] = { command, options };
  _registerCommand(commandName, command);
};

export const getCommandInfo = commandName => registerCommands[commandName].options;
export const getCommand = commandName => registerCommands[commandName].command;

export const applyMiddlewares = (commandName, ...middlewares) => {
  registerMiddlewares(commandName, middlewares);
  if (typeof commandName === 'string') {
    registerWithMiddleware(commandName);
  } else {
    Object.keys(registerCommands).forEach(key => registerWithMiddleware(key));
  }
};

export default registerCommand;
