/* global describe,it,afterEach */
import { expect } from 'chai';
import { Observable } from 'rxjs/internal/Observable';
import CommandBus from '../../../src/core/CommandBus';
import AsyncCommandBus from '../../../src/core/AsyncCommandBus';
import { registerMiddleware } from '../../../src/core/middlewares';
import {
  registerAction, getAction, getActionnfo, getAllCommandsName,
} from '../../../src/core/registerAction';
import rxMap from '../../../src/map/RxMap';

describe('Register Action', () => {
  it('register action', () => {
    expect(Observable).to.not.respondTo('testRegister');
    expect(CommandBus).to.not.respondTo('testRegister');

    registerAction('testRegister', () => 'testRegister');
    const f = getAction('testRegister');
    expect(f).to.be.a('function');
  });
  it('test getAllCommnadsName', () => {
    registerAction('one', () => 'testRegister');
    const names = getAllCommandsName();
    expect(names).to.be.a('array').that.includes('one');
  });
  it('function return asyncCommandBus', () => {
    registerAction('testRegister', () => 'testRegister');
    const res = rxMap.testRegister();
    expect(res).to.instanceOf(AsyncCommandBus);
  });
  it('function create return CommandBus', () => {
    registerAction('create', () => 'testRegister');
    const res = rxMap.create('aa', 'bb');
    expect(res).to.instanceOf(CommandBus);
  });
  it('getAction', () => {
    const f = () => 'test';
    registerAction('test', f);
    const ff = getAction('test');
    expect(ff).to.eq(f);
  });
  it('getActionnfo', () => {
    const f = () => 'test';
    const options = { test: 'test' };
    registerAction('test', f, options);
    const opt = getActionnfo('test');
    expect(opt).to.eq(options);
  });
  it.skip('update all actions ', () => {
    const f = () => 'test';
    const func = next => (Map, args) => {
      next(Map, args);
      return 'bb';
    };
    registerAction('aaa', f);
    const fBefore = rxMap.aaa;
    registerMiddleware(func);
    const fAfter = rxMap.aaa;
    expect(fBefore).not.eq(fAfter);
  });
  afterEach(() => {
    delete Observable.prototype.testRegister;
    delete CommandBus.prototype.testRegister;
  });
});
