
const registerObservers = {};

/**
 * Funcion que permite registrar los observadores que luego se podran utilzar
 * desde el metodo RxMap.observer({name}).
 * La funcion tiene que devolver un objeto observable de RxJs
 *
 * @example
 *  // Registrar observador
 *  registerObserver('gps',()=>from('5'));
 *
 *  // Utilizar observador
 *  RxMap.observer('gps').subscribe(cosole.log);
 *
 * @param {string} name nombre del observador a registrar
 * @param {function} observer observador a implementar
 */
export const registerObserver = (name, observer) => {
  registerObservers[name] = observer;
};

/**
 * Recupera el obsservador que recibe por parametro
 * @param {string} name
 * @private
*/
export const getObserver = name => registerObservers[name];
