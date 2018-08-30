
export const name = 'rxmap';
export const actions = ['addData', 'create', 'marker', 'point', 'popup', 'setCenter'];
export const observers = ['gps', 'center', 'click'];
export const func = (type, mapLib, version, key) => import(/* webpackMode: "lazy" */ `./${type}/${mapLib}@${version}/${key}`);

export default [
  name,
  {
    observers,
    actions,
  },
  func,
];
