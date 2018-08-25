/* global describe,it,afterEach */
import { expect } from 'chai';
import { Observable } from 'rxjs/internal/Observable';
import CommandBus from '../../../src/core/CommandBus';
import AsyncCommandBus from '../../../src/core/AsyncCommandBus';
import { registerMiddleware } from '../../../src/core/middlewares';
import {
  registerCommand, getCommand, getCommandInfo, getAllCommandsName,
} from '../../../src/core/registerCommand';
import RxMap from '../../../src/RxMap';
import { applyOperators } from '../../../src/core/registerOperator';

describe('Register Command', () => {
  it('register command', () => {
    expect(Observable).to.not.respondTo('testRegister');
    expect(CommandBus).to.not.respondTo('testRegister');

    registerCommand('testRegister', () => 'testRegister');
    applyOperators(Observable);
    const f = getCommand('testRegister');
    expect(f).to.be.a('function');
    expect(Observable).to.respondTo('testRegister');
    expect(CommandBus).to.respondTo('testRegister');
  });
  it('test getAllCommnadsName', () => {
    registerCommand('one', () => 'testRegister');
    const names = getAllCommandsName();
    expect(names).to.be.a('array').that.includes('one');
  });
  it('function return asyncCommandBus', () => {
    registerCommand('testRegister', () => 'testRegister');
    const res = RxMap.testRegister();
    expect(res).to.instanceOf(AsyncCommandBus);
  });
  it('function create return CommandBus', () => {
    registerCommand('create', () => 'testRegister');
    const res = RxMap.create('aa', 'bb');
    expect(res).to.instanceOf(CommandBus);
  });
  it('getCommand', () => {
    const f = () => 'test';
    registerCommand('test', f);
    const ff = getCommand('test');
    expect(ff).to.eq(f);
  });
  it('getCommandInfo', () => {
    const f = () => 'test';
    const options = { test: 'test' };
    registerCommand('test', f, options);
    const opt = getCommandInfo('test');
    expect(opt).to.eq(options);
  });
  it('update all commands ', () => {
    const f = () => 'test';
    const func = next => (Map, args) => {
      next(Map, args);
      return 'bb';
    };
    registerCommand('aaa', f);
    const fBefore = RxMap.aaa;
    registerMiddleware(func);
    const fAfter = RxMap.aaa;
    expect(fBefore).not.eq(fAfter);
  });
  afterEach(() => {
    delete Observable.prototype.testRegister;
    delete CommandBus.prototype.testRegister;
  });
});
