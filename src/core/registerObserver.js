import Map from 'core-js/es6/map';

const registerObservers = new Map();

export const setObserver = (name, observer) => {
    registerObservers.set(name, observer);
};

export const getObserver = (name) => {
    return registerObservers.get(name);
};
