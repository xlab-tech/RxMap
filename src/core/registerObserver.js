

const registerObservers = new window.Map();

export const setObserver = (name, observer) => {
    registerObservers.set(name, observer);
};

export const getObserver = (name) => {
    return registerObservers.get(name);
};