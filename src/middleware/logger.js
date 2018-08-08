
export const LoggerMiddleware = next => (Map, args) => {
  const commandName = Map.getCommandName();
  console.log('Pre execute Command ', commandName, args);
  const res = next(Map, args);
  console.log('Post execute Command', commandName, res);
  return res;
};

export const TimerMiddleware = next => (Map, args) => {
  const commandName = Map.getCommandName();
  console.time(commandName);
  const res = next(Map, args);
  console.timeEnd(commandName);
  return res;
};
