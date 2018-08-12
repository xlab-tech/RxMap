
export const LoggerMiddleware = next => async (Map, args) => {
  const commandName = Map.getCommandName();
  const now = new Date().getTime();
  const name = `Command ${commandName} [${now}]: `;
  console.log(`Pre ${name}`, args);
  const res = await next(Map, args);
  console.log(`Post ${name}`, res);
  return res;
};

export const TimerMiddleware = next => async (Map, args) => {
  const commandName = Map.getCommandName();
  const now = new Date().getTime();
  const name = `${commandName}_${now}`;
  console.time(name);
  const res = await next(Map, args);
  console.timeEnd(name);
  return res;
};
