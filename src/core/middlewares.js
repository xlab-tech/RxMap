
const _middlewares = {
  _global: [],
};

const _subscribers = [];

const compose = (action, ...funcs) => {
  if (funcs.length === 0) {
    return action;
  }
  if (funcs.length === 1) {
    return funcs[0](action);
  }
  return funcs.reduce((a, b) => a(b(action)));
};

const executeAction = action => (commandBus, args) => action(commandBus.getContext(), ...args);

export const applyMiddlewares = (actionName, action) => {
  let middlewares = _middlewares._global;
  if (_middlewares[actionName]) {
    middlewares = _middlewares._global.concat(_middlewares[actionName]);
  }
  return compose(executeAction(action), ...middlewares);
};

export const registerMiddleware = (actionName, ...middlewares) => {
  if (!actionName) {
    return;
  }
  if (typeof actionName === 'string') {
    _middlewares[actionName] = middlewares;
    _subscribers.forEach(func => func(actionName));
    return;
  }
  _middlewares._global = [actionName, ...middlewares];
  _subscribers.forEach(func => func());
};

export const subscribe = func => _subscribers.push(func);
