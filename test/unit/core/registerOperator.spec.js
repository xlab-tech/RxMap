/* global describe,it */
import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import registerOperator from '../../../src/core/registerOperator';
import CommandBus from '../../../src/core/CommandBus';

describe('Register Operator', () => {
  jsdom({
    url: 'https://example.org/',
  });

  it('add Observable function', () => {
    registerOperator('test', () => 'asdf');
    expect(Observable).to.respondTo('test');
  });
  it('getCommandBus', () => {
    registerOperator('test', () => 'asdf');
    const commandBus = new CommandBus();
    return new Promise((resolve) => {
      from('1').setCommandBus(commandBus)
        .test(res => res)
        .subscribe((a) => {
          expect(a).to.eq('asdf');
          resolve();
        });
    });
  });
  it('getCommandBus 2', () => {
    registerOperator('test', () => Promise.resolve('asdf'));
    const commandB = new CommandBus();
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
