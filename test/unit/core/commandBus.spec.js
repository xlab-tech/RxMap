/* global describe,it */
import { expect } from 'chai';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import CommandBus from '../../../src/core/CommandBus';
import rxMap from '../../../src/map/RxMap';
import { registerAction } from '../../../src/core/registerAction';

describe('CommandBus', () => {
  it('create new ActionBus', () => {
    const actionBus = new CommandBus();
    expect(actionBus).to.be.an.instanceof(CommandBus);
    const ret = actionBus._lastAction;
    expect(ret).to.deep.equal({
      value: null,
      name: null,
    });
  });

  it('action Bus getSource', () => {
    const actionBus = new CommandBus();
    actionBus._source = 't';
    const temp = actionBus.getSource();
    expect(temp).to.be.eq('t');
  });

  it('action Bus getActionName', () => {
    const actionBus = new CommandBus();
    actionBus._executingAction = 'ppp';
    const temp = actionBus.getActionName();
    expect(temp).to.be.eq('ppp');
  });

  it('action Bus getValue', (done) => {
    const actionBus = new CommandBus();
    actionBus._lastAction = { value: 'rrr' };
    actionBus.getValue().subscribe((res) => {
      expect(res.value).to.have.eq('rrr');
      done();
    });
  });

  it('action Bus getContext', () => {
    const actionBus = new CommandBus();
    actionBus._source = { getContext: () => ({ test: '3' }) };
    const temp = actionBus.getContext();
    // eslint-disable-next-line no-unused-expressions
    expect(temp).to.have.property('lastExecution');
    expect(temp).to.have.property('source');
    expect(temp).to.have.property('test');
  });
  it('executing', (done) => {
    const actionBus = new CommandBus();
    actionBus._source = rxMap;
    actionBus._actionsSubject = { next: () => '' };
    const $res = actionBus._execute('test', () => 1, []);
    $res.subscribe((res) => {
      expect(res.value).to.have.eq(3);
      done();
    });
  });
  it.skip('observer data ', () => {
    const $stream = rxMap.observer([5]);
    expect($stream).is.a.instanceOf(Observable);
  });
  it('observer error ', () => {
    try {
      rxMap.observer('kk');
    } catch (err) {
      expect(err).is.a.instanceOf(Error);
    }
  });
  it('observer action', (done) => {
    registerAction('testObs', () => 'kk');
    rxMap.observerAction('testObs').subscribe((res) => {
      expect(res.name).to.have.eq('testObs');
      expect(res.value).to.have.eq('kk');
      done();
    });
    rxMap.testObs();
  });
  it('observer action 2', (done) => {
    registerAction('ostrr', () => 'kk');
    rxMap.observerAction('os.').subscribe((res) => {
      expect(res.name).to.have.eq('ostrr');
      expect(res.value).to.have.eq('kk');
      done();
    });
    rxMap.ostrr();
  });
});
