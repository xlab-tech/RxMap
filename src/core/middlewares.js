
let _middlewares = {
    '_global': []
};

const compose = (command, ...funcs) => {
    if (funcs.length === 0) {
        return command
    }
    if (funcs.length === 1) {
        return funcs[0](command);
    }
    return funcs.reduce((a, b) => {
        return a(b(command));
    })

};

const executeCommand = (commandName, command) => (_this, args) => {
    if (command.prototype.execute) {
        const commandInstace = new command(...args);
        commandInstace.setMap(_this._map);
        return commandInstace.execute();
    } else {
        return command.apply(_this, args);
    }
};

export const applyMiddlewares = (commandName, command) => {
    let middlewares = _middlewares['_global'];
    if (_middlewares[commandName]) {
        middlewares = _middlewares['_global'].concat(_middlewares[commandName]);
    }
    return compose(executeCommand(commandName, command), ...middlewares);
};

export const registerMiddlewares = (commandName, middlewares) => {
    if (typeof commandName === 'string') {
        _middlewares[commandName] = middlewares;
        return;
    }
    _middlewares['_global'] = [commandName, ...middlewares];
};

export default applyMiddlewares;
