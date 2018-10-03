/* global describe,it */
import { expect } from 'chai';
import CommandBus from '../../../src/core/CommandBus';
import { applyMiddlewares, registerMiddleware, subscribe } from '../../../src/core/middlewares';

describe('Middlewares', () => {
  it('apply middleware No paramas', () => {
    registerMiddleware();
    const func = () => () => 'asfas';
    const newFunc = applyMiddlewares('test', func);
    const actionBus = new CommandBus();
    actionBus._source = { getContext: () => ({ test: '3' }) };
    expect(newFunc(actionBus, [])).to.eq(func()());
  });
  it('apply middleware one', () => {
    const f = next => (Map, args) => {
      next(Map, args);
      return 'bb';
    };
    registerMiddleware('testRegister', f);
    const actionBus = new CommandBus();
    actionBus._source = { getContext: () => ({ test: '3' }) };
    const func = () => () => 'asfas';
    const newFunc = applyMiddlewares('test', func);
    const newFunc2 = applyMiddlewares('testRegister', func);
    expect(newFunc(actionBus, [])).to.eq('asfas');
    expect(newFunc2(actionBus, [])).to.eq('bb');
  });
  it('apply middleware all', () => {
    const f = next => (Map, args) => {
      next(Map, args);
      return 'aa';
    };
    registerMiddleware(f);
    const func = () => () => 'asfas';
    const newFunc = applyMiddlewares('test', func);
    const actionBus = new CommandBus();
    actionBus._source = { getContext: () => ({ test: '3' }) };
    expect(newFunc(actionBus, [])).to.eq('aa');
  });
  it('subscribe', () => new Promise((resolve) => {
    const f = next => (Map, args) => next(Map, args);
    subscribe(() => resolve());
    registerMiddleware('f', f);
  }));
  it('subscribe all', () => new Promise((resolve) => {
    const f = next => (Map, args) => next(Map, args);
    subscribe(() => resolve());
    registerMiddleware(f);
  }));
});
