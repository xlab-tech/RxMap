/* global describe,it */
import { expect } from 'chai';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import registerOperator, { applyOperators } from '../../../src/core/registerOperator';
import CommandBus from '../../../src/core/CommandBus';
import RxMap from '../../../src/RxMap';

describe('Register Operator', () => {
  it('add Observable function', () => {
    registerOperator('testbb', () => 'asdf');
    const $stream = from('1');
    applyOperators($stream);
    expect($stream).to.respondTo('testbb');
  });
  it('getCommandBus', () => {
    registerOperator('testb', () => 'asdf');
    applyOperators(Observable);
    return new Promise((resolve) => {
      const $st = RxMap.fromObserver(from('1'));
      $st.testb(res => res)
        .subscribe((a) => {
          expect(a).to.eq('asdf');
          resolve();
        });
    });
  });
  it('getCommandBus 2', () => {
    registerOperator('test', () => Promise.resolve('asdf'));
    applyOperators(Observable);
    const commandB = new CommandBus();
    commandB._source = { getMapLibrary: () => 'ss' };
    return new Promise((resolve) => {
      const $stream = from('1');
      $stream.source = { getCommandBus: () => commandB };
      $stream
        .test('aaa')
        .subscribe((a) => {
          expect(a).to.eq('asdf');
          resolve();
        });
    });
  });
});
