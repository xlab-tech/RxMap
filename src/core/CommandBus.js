
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import isPromise from '../utils/isPromise';
import { getObserver } from './registerObserver';
import { setProxy } from './registerOperator';
import observableStore from './observableStore';

const _applyCommandBus = (observer, CommandBus) => {
  const _observer = setProxy(observer);
  return _observer.setCommandBus(CommandBus.getSource());
};

class CommandBus {
  constructor() {
    this._actionsSubject = new Subject();
    this.store = observableStore();
    this._lastAction = {
      value: null,
      name: null,
    };
  }

  /**
   * @private
   */
  getSource() {
    return this;
  }

  /**
   * @private
   */
  getValue() {
    return of(this._lastAction);
  }

  /**
   * Funcion que ejecuta la  funcion sobre
   * @param {*} actionName
   * @param {*} action
   * @param {*} args
   * @private
   */
  execute(actionName, action, args) {
    return this._execute(actionName, action, args).subscribe();
  }

  _saveExecution(actionName, result) {
    this._lastAction = {
      value: result,
      name: actionName,
    };
    this._executingAction = false;
    return this._lastAction;
  }

  _execute(actionName, action, args) {
    this._executingAction = actionName;
    const ret = action(this, args);
    const $let = setProxy((isPromise(ret) || ret instanceof Observable) ? from(ret) : of(ret));
    $let.setCommandBus(this.getSource());
    return $let.pipe(
      map(data => this._saveExecution(actionName, data)),
      tap(data => this._actionsSubject.next(data)),
    );
  }

  /**
   *
   * @private
   */
  isExecuting() {
    return !!this._executingAction;
  }

  /**
   * @private
   */
  getActioname() {
    return this._executingAction;
  }

  /**
   *
   * Funcion que puede recibir un string con el nombre del
   * obsevador que se quiere recuperar de los registrados
   * o que puede recibir un Array, una promesa o un Iterable
   * o otro Observebable
   * sobre el que devuelve un observable con el CommandBus
   * aplicado para poder invocar los comandos.
   *
   * Al observador se le pueden pasar los argumentos que necesite.
   *
   * @example
   *  // String
   *
   * RxMap.observer('test')
   *  .example('test')
   *  .subscribe(console.log);
   * @example
   *  // Array
   * RxMap.observer([1,2,3,4,5])
   *  .example('test')
   *  .subscribe(console.log);
   * @example
   *
   * const $stream = from(['a','b','c']);
   * RxMap.observer($stream)
   *  .example('test')
   *  .subscribe(console.log);
   *
   * @param {string|Array|Promise|Iterable|Observer} observerName
   * @param  {...any} args
   * @return {Observer}
   */
  observer(observerName, ...args) {
    if (typeof observerName !== 'string') {
      const obser = from(observerName);
      return _applyCommandBus(obser, this);
    }
    const observer = getObserver(observerName);
    if (!observer) {
      throw new Error(`Observer ${observerName} not register`);
    }
    const obser = observer(this.getContext(), ...args);
    return _applyCommandBus(obser, this);
  }

  /**
   * Funcion que permite observar la execucion de cualquir
   * comando y obtener su respuesta,
   * Se puede pasar un nombre o una expresion regular para poder
   * observar mas de un comando o todos.
   *
   * @param {String} name Nombre o Regex a evaluar
   * @return Observer
   */
  observerAction(name) {
    return this._actionsSubject.pipe(filter(lastAction => lastAction.name.match(name)));
  }

  /**
   * Funcion que permite observar los datos del store,
   * Se puede pasar una propiedad o una expresion regular para poder
   * observar mas de un comando o todos.
   *
   * @param {String} name Nombre o Regex a evaluar
   * @return Observer
  */
  observerData(property) {
    return this.store.observer(property);
  }

  /**
   *
   * @private
   */
  getContext() {
    return null;
  }
}

export default CommandBus;
