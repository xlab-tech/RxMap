
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import isPromise from '../utils/isPromise';
import { getObserver } from './registerObserver';
import { applyOperators } from './registerOperator';

const _applyCommandBus = (observer, CommandBus) => {
  let _observer = observer;
  if (!observer.setCommandBus) {
    _observer = applyOperators(observer);
  }
  return _observer.setCommandBus(CommandBus.getSource());
};

class CommandBus {
  constructor() {
    this._commandsSubject = new Subject();
    this._lastCommand = {
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
    return of(this._lastCommand);
  }

  /**
   * Funcion que ejecuta la  funcion sobre
   * @param {*} commandName
   * @param {*} command
   * @param {*} args
   * @private
   */
  execute(commandName, command, args) {
    return this._execute(commandName, command, args).subscribe();
  }

  _saveExecution(commandName, result) {
    this._lastCommand = {
      value: result,
      name: commandName,
    };
    this._executingCommand = false;
    return this._lastCommand;
  }

  _execute(commandName, command, args) {
    this._executingCommand = commandName;
    const ret = command(this, args);
    const $let = (isPromise(ret) || ret instanceof Observable) ? from(ret) : of(ret);
    $let.setCommandBus(this.getSource());
    return $let.pipe(
      map(data => this._saveExecution(commandName, data)),
      tap(data => this._commandsSubject.next(data)),
    );
  }

  /**
   *
   * @private
   */
  isExecuting() {
    return !!this._executingCommand;
  }

  /**
   * @private
   */
  getCommandName() {
    return this._executingCommand;
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
  observerCommand(name) {
    return this._commandsSubject.pipe(filter(lastCommand => lastCommand.name.match(name)));
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
