
export const LoggerMiddleware = next => async (Map, args) => {
  const actionName = Map.getActionName();
  const now = new Date().getTime();
  const name = `Command ${actionName} [${now}]: `;
  console.log(`Pre ${name}`, args);
  const res = await next(Map, args);
  console.log(`Post ${name}`, res);
  return res;
};

export const TimerMiddleware = next => async (Map, args) => {
  const actionName = Map.getActionName();
  const now = new Date().getTime();
  const name = `${actionName}_${now}`;
  console.time(name);
  const res = await next(Map, args);
  console.timeEnd(name);
  return res;
};
