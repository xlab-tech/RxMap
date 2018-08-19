
const _middlewares = {
  _global: [],
};

const _subscribers = [];

const compose = (command, ...funcs) => {
  if (funcs.length === 0) {
    return command;
  }
  if (funcs.length === 1) {
    return funcs[0](command);
  }
  return funcs.reduce((a, b) => a(b(command)));
};

const executeCommand = command => (commandBus, args) => command(commandBus.getContext(), ...args);

export const applyMiddlewares = (commandName, command) => {
  let middlewares = _middlewares._global;
  if (_middlewares[commandName]) {
    middlewares = _middlewares._global.concat(_middlewares[commandName]);
  }
  return compose(executeCommand(command), ...middlewares);
};

export const registerMiddleware = (commandName, ...middlewares) => {
  if (!commandName) {
    return;
  }
  if (typeof commandName === 'string') {
    _middlewares[commandName] = middlewares;
    _subscribers.forEach(func => func(commandName));
    return;
  }
  _middlewares._global = [commandName, ...middlewares];
  _subscribers.forEach(func => func());
};

export const subscribe = func => _subscribers.push(func);
