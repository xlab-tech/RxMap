
import { from } from 'rxjs/internal/observable/from';
import { Subject } from 'rxjs/internal/Subject';
import { filter } from 'rxjs/internal/operators/filter';
import isPromise from '../utils/isPromise';
import { getObserver } from './registerObserver';
import { applyOperators } from './registerOperator';

const _applyCommandBus = (observer) => {
  if (!observer.setCommandBus) {
    applyOperators(observer);
  }
};

class CommandBus {
  constructor() {
    this._commandsSubject = new Subject();
    this._lastCommand = {
      value: null,
      name: null,
    };
  }

  getSource() {
    return this;
  }

  execute(commandName, command, args) {
    return this._execute(commandName, command, args);
  }

  _saveExecution(commandName, result) {
    this._lastCommand = {
      value: result,
      name: commandName,
    };
    this._commandsSubject.next(this._lastCommand);
    this._executingCommand = false;
    return result;
  }

  _execute(commandName, command, args) {
    this._executingCommand = commandName;
    const ret = command(this, args);
    const value = ret;
    if (isPromise(ret)) {
      return ret.then(data => this._saveExecution(commandName, data));
    }
    return this._saveExecution(commandName, value);
  }

  isExecuting() {
    return !!this._executingCommand;
  }

  getCommandName() {
    return this._executingCommand;
  }

  /**
   * funcion que añade el CommandBus al Observador RxJS para
   * poder utilizar todos comandos registrados
   *
   * @example
   * const $stream = from(['a','b','c']);
   * RxMap.fromObserver($stream)
   *  .example('test')
   *  .subscribe(console.log);
   *
   * @param {Observer} observador RxJs
   * @return {Observer}
   */
  fromObserver(observer) {
    _applyCommandBus(observer);
    return observer.setCommandBus(this);
  }

  /**
   *
   * Funcion que puede recibir un string con el nombre del
   * obsevador que se quiere recuperar de los registrados
   * o que puede recibir un Array, una promesa o un Iterable
   * sobre el que devuelve un observable con el CommandBus
   * aplicado.
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
   *
   * @param {string|Array|Promise|Iterable} observerName
   * @param  {...any} args
   * @return {Observer}
   */
  observer(observerName, ...args) {
    if (typeof observerName !== 'string') {
      const obser = from(observerName);
      _applyCommandBus(obser);
      return obser.setCommandBus(this);
    }
    const observer = getObserver(observerName);

    if (!observer) {
      throw new Error(`Observer ${observerName} not register`);
    }
    const obser = observer(this.getContext(), ...args);
    _applyCommandBus(obser);
    return obser.setCommandBus(this);
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
  observerCommand(name) {
    return this._commandsSubject.pipe(
      filter(lastCommand => lastCommand.name.match(name)),
    );
  }

  getContext() {
    return null;
  }
}

export default CommandBus;
