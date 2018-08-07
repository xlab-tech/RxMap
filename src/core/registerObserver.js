
const registerObservers = {};

export const setObserver = (name, observer) => {
    registerObservers[name] = observer;
};

export const getObserver = (name) => {
    return registerObservers[name];
};
