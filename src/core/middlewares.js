
const _middlewares = {
  _global: [],
};

const compose = (command, ...funcs) => {
  if (funcs.length === 0) {
    return command;
  }
  if (funcs.length === 1) {
    return funcs[0](command);
  }
  return funcs.reduce((a, b) => a(b(command)));
};

const executeCommand = (commandName, Command) => (_this, args) => {
  if (Command.prototype.execute) {
    const commandInstace = new Command(...args);
    commandInstace.setMap(_this._map);
    return commandInstace.execute();
  }
  return Command.apply(_this, args);
};

export const applyMiddlewares = (commandName, command) => {
  let middlewares = _middlewares._global;
  if (_middlewares[commandName]) {
    middlewares = _middlewares._global.concat(_middlewares[commandName]);
  }
  return compose(executeCommand(commandName, command), ...middlewares);
};

export const registerMiddlewares = (commandName, middlewares) => {
  if (typeof commandName === 'string') {
    _middlewares[commandName] = middlewares;
    return;
  }
  _middlewares._global = [commandName, ...middlewares];
};

export default applyMiddlewares;
