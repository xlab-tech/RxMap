
const registerObservers = {};

export const registerObserver = (name, observer) => {
  registerObservers[name] = observer;
};

export const getObserver = name => registerObservers[name];
