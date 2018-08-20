/* global describe,it */
import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import AsyncCommandBus from '../../../src/core/AsyncCommandBus';
import Observable from '../../../src/core/Observable';

describe('AsyncCommandBus', () => {
  jsdom({
    url: 'https://example.org/',
  });
  it('subscribe', () => {
    const async = new AsyncCommandBus();
    let pepe;
    async.subscribe(() => {
      pepe = 'aa';
    });
    async._complete();
    expect(pepe).to.eq('aa');
  });
  it('observer data ', () => {
    const async = new AsyncCommandBus();
    async._executingCommand = false;
    const $stream = async.observer([5]);
    expect($stream).is.a.instanceOf(Observable);
  });
  it('observer data args', () => {
    const async = new AsyncCommandBus();
    const $stream = async.observer([5], 4);
    expect($stream).is.a.instanceOf(Observable);
  });
  it('observer executing', (done) => {
    const async = new AsyncCommandBus();
    async._executingCommand = 'test';
    const $stream = async.observer([5]);
    async._complete();
    expect($stream).is.a.instanceOf(Observable);
    $stream.subscribe((res) => {
      expect(res).to.eq(5);
      async._executingCommand = false;
      done();
    });
  });
  it('save data', () => {
    const async = new AsyncCommandBus();
    async._saveExecution('test', 5);
    expect(async.value().value).to.eq(5);
  });
});
