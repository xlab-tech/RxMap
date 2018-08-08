const isPromise = function (value) {
  return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
};

export default isPromise;
