/* global describe,it */
import { expect } from 'chai';
import { Observable } from 'rxjs/internal/Observable';
import AsyncCommandBus from '../../../src/core/AsyncCommandBus';

describe('AsyncCommandBus', () => {
  it('subscribe', () => {
    const async = new AsyncCommandBus();
    let pepe;
    async.subscribe(() => {
      pepe = 'aa';
    });
    async._complete();
    expect(pepe).to.eq('aa');
  });
  it('action Bus getValue', (done) => {
    const actionBus = new AsyncCommandBus();
    actionBus._executingAction = true;
    actionBus._lastAction = { value: 'rrr' };
    actionBus.getValue().subscribe((res) => {
      expect(res.value).to.have.eq('rrr');
      done();
    });
    actionBus._complete();
  });
  it('observer data ', () => {
    const async = new AsyncCommandBus();
    async.setSource({ _actionsSubject: 3 });
    async._executingAction = false;
    const $stream = async.observer([5]);
    expect($stream).is.a.instanceOf(Observable);
  });
  it('observer data args', () => {
    const async = new AsyncCommandBus();
    async.setSource({ _actionsSubject: 3 });
    const $stream = async.observer([5], 4);
    expect($stream).is.a.instanceOf(Observable);
  });
  it('observer executing', (done) => {
    const async = new AsyncCommandBus();
    async.setSource({ _actionsSubject: 3 });
    async._executingAction = 'test';
    const $stream = async.observer([5]);
    async._complete();
    expect($stream).is.a.instanceOf(Observable);
    $stream.subscribe((res) => {
      expect(res).to.eq(5);
      async._executingAction = false;
      done();
    });
  });
  it('save data', () => {
    const async = new AsyncCommandBus();
    async._saveExecution('test', 5);
    expect(async._lastAction.value).to.eq(5);
  });
  it('save data', () => {
    const async = new AsyncCommandBus();
    async.setSource(5);
    const temp = async.getSource();
    expect(temp).to.eq(5);
  });
  it('action Bus getValue', (done) => {
    const async = new AsyncCommandBus();
    async._executingAction = false;
    async._lastAction = { value: 'rrr' };
    async.getValue().subscribe((res) => {
      expect(res.value).to.have.eq('rrr');
      done();
    });
  });
});
