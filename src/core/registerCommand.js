import { applyMiddlewares } from './middlewares.js';
import { registerOperator } from './registerOperator.js';
import CommandBus from './CommandBus.js';
import AsyncCommandBus from './AsyncCommandBus.js';

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

export const registerCommand = (commandName, command) => {
    if (!commandName) {
        Object.keys(registerCommands).map(key => registerCommand(key));
        return;
    }
    // if (CommandBus.prototype[commandName]) {
    //    throw `Command ${commandName} yet registered`
    // }
    if (command) {
        registerCommands[commandName] = command;
    } else {
        command = registerCommands[commandName];
        if (!command) {
            throw `Command ${commandName} not registered`
        }
    }
    _registerCommand(commandName, command);
};
