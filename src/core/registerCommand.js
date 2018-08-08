import { applyMiddlewares } from './middlewares';
import registerOperator from './registerOperator';
import CommandBus from './CommandBus';
import AsyncCommandBus from './AsyncCommandBus';

const registerCommands = {};

const isAsyncCommandBus = function (value) {
  return value && typeof value.subscribe === 'function' && typeof value.execute === 'function';
};

const _registerCommand = (commandName, command) => {
  const commandExecute = applyMiddlewares(commandName, command);
  CommandBus.prototype[commandName] = function (...args) {
    let _this = this;
    if (!(isAsyncCommandBus(_this))) {
      _this = AsyncCommandBus.lift(this.getMap(), this);
    }
    _this.execute(commandName, commandExecute, args);
    return _this;
  };
  registerOperator(commandName, commandExecute);
};

const registerCommand = (commandName, command) => {
  if (!commandName) {
    Object.keys(registerCommands).map(key => registerCommand(key));
    return;
  }
  let commandValue = command;
  // if (CommandBus.prototype[commandName]) {
  //    throw `Command ${commandName} yet registered`
  // }
  if (commandValue) {
    registerCommands[commandName] = commandValue;
  } else {
    commandValue = registerCommands[commandName];
    if (!commandValue) {
      throw new Error(`Command ${commandName} not registered`);
    }
  }
  _registerCommand(commandName, commandValue);
};

export default registerCommand;
