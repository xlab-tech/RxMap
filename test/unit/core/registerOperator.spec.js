/* global describe,it,afterEach,beforeEach */
import { expect } from 'chai';
import { from } from 'rxjs/internal/observable/from';
import sinon from 'sinon';
import registerOperator, { applyOperators } from '../../../src/core/registerOperator';
import { registerAction } from '../../../src/core/registerAction';
import CommandBus from '../../../src/core/CommandBus';

describe('Register Operator', () => {
  it('add Observable function', () => {
    registerOperator('testbb', () => 'asdf');
    const $stream = from('1');
    applyOperators($stream);
    expect($stream).to.respondTo('testbb');
  });
  it('getCommandBus args', () => {
    registerAction('test223', () => Promise.resolve('asdf'));
    const actionB = new CommandBus();
    // actionB._source = { getMapLibrary: () => 'ss' };
    return new Promise((resolve) => {
      const $stream = actionB.observer(from('1'));
      $stream
        .test223(() => 'ppp')
        .subscribe((a) => {
          expect(a.value).to.eq('asdf');
          resolve();
        });
    });
  });
  it('getCommandBus', () => {
    registerAction('test222', () => Promise.resolve('asdf'));
    const actionB = new CommandBus();
    // actionB._source = { getMapLibrary: () => 'ss' };
    return new Promise((resolve) => {
      const $stream = actionB.observer(from('1'));
      $stream
        .test222('aaa')
        .subscribe((a) => {
          expect(a.value).to.eq('asdf');
          resolve();
        });
    });
  });
  describe('getCommandBus', () => {
    const actionB = new CommandBus();
    const $stream = from(actionB.observer(from('1')));
    beforeEach(() => {
      const ss = sinon.stub($stream, 'getCommandBus');
      ss.onCall(0).returns(null);
      ss.onCall(1).returns(actionB);
    });
    afterEach(() => {
      $stream.getCommandBus.restore();
    });
    it('getCommandBus 2', () => {
      registerAction('test222', () => Promise.resolve('asdf'));
      $stream.source = actionB.observer(from('1'));
      // actionB._source = { getMapLibrary: () => 'ss' };
      return new Promise((resolve) => {
        $stream
          .test222('aaa')
          .subscribe((a) => {
            expect(a.value).to.eq('asdf');
            resolve();
          });
      });
    });
    it('getCommandBus 3', () => {
      registerAction('test222', () => Promise.resolve('asdf'));
      return new Promise((resolve) => {
        $stream.source = null;
        $stream
          .test222('aaa')
          .subscribe({
            error: () => resolve(),
          });
      });
    });
  });
});
