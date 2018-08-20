/* global describe,it */
import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import CommandBus from '../../../src/core/CommandBus';
import { applyMiddlewares, registerMiddleware, subscribe } from '../../../src/core/middlewares';

describe('Middlewares', () => {
  jsdom({
    url: 'https://example.org/',
  });
  it('apply middleware No paramas', () => {
    registerMiddleware();
    const func = () => 'asfas';
    const newFunc = applyMiddlewares('test', func);
    const commandBus = new CommandBus();
    commandBus.setSource({ getMapLibrary: () => 'tt' });
    expect(newFunc(commandBus, [])).to.eq(func(commandBus, []));
  });
  it('apply middleware one', () => {
    const f = next => (Map, args) => {
      next(Map, args);
      return 'bb';
    };
    registerMiddleware('testRegister', f);
    const commandBus = new CommandBus();
    commandBus.setSource({ getMapLibrary: () => 'tt' });
    const func = () => 'asfas';
    const newFunc = applyMiddlewares('test', func);
    const newFunc2 = applyMiddlewares('testRegister', func);
    expect(newFunc(commandBus, [])).to.eq('asfas');
    expect(newFunc2(commandBus, [])).to.eq('bb');
  });
  it('apply middleware all', () => {
    const f = next => (Map, args) => {
      next(Map, args);
      return 'aa';
    };
    registerMiddleware(f);
    const func = () => 'asfas';
    const newFunc = applyMiddlewares('test', func);
    const commandBus = new CommandBus();
    commandBus.setSource({ getMapLibrary: () => 'tt' });
    expect(newFunc(commandBus, [])).to.eq('aa');
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
