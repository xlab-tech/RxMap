

import { of } from 'rxjs/internal/observable/of';
import { from } from 'rxjs/internal/observable/from';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { take } from 'rxjs/internal/operators/take';
import isPromise from '../utils/isPromise';

class CommandBus {
  constructor() {
    this._actionsSubject = null;
    this._executingAction = false;
    this._source = null;
    this._lastAction = {
      value: null,
      name: null,
    };
  }

  setSource(source) {
    this._source = source;
  }

  setActionsSubject(actionsSubject) {
    this._actionsSubject = actionsSubject;
  }

  /**
  * @private
  */
  getSource() {
    return this._source;
  }


  /**
   * @private
   */
  getValue() {
    return of(this._lastAction);
  }

  wait() {
    return new Promise((resolve) => {
      this._actionsSubject.pipe(take(1)).subscribe(() => {
        resolve(this._lastAction);
      });
    });
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
    const $let = this._source.observer((isPromise(ret) || ret instanceof Observable) ? from(ret) : of(ret));
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
  getActionName() {
    return this._executingAction;
  }

  /**
   *
   * @private
   */
  getContext() {
    return {
      lastExecution: this._lastAction,
      source: this._source,
      ...this._source.getContext(),
    };
  }
}

export default CommandBus;
