/* global describe,it,afterEach,beforeEach */
import { expect } from 'chai';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import CommandBus from '../../../src/core/CommandBus';
import AsyncCommandBus from '../../../src/core/AsyncCommandBus';
import { observerFrom } from '../../../src/core/proxyObservable';
import { registerAction } from '../../../src/core/registerAction';
import { registerObserver } from '../../../src/core/registerObserver';
import rxMap from '../../../src/map/RxMap';

describe('proxy Observable', () => {
  const commandBus = new CommandBus();
  commandBus._actionsSubject = new Subject();
  commandBus._source = rxMap;

  it('add Observable function', () => {
    const $stream = from([1]);
    const $$stream = observerFrom(commandBus)($stream);
    const aux = $$stream.getCommandBus();
    expect(aux).to.have.instanceof(AsyncCommandBus);
  });
  it('observer execute action', () => {
    registerAction('test', () => 'r');
    registerObserver('test', () => from([2]));
    const $$stream = observerFrom(commandBus)('test');
    $$stream.test().subscribe((res) => {
      expect(res.value).to.have.eq('r');
    });
  });
  it('observer execute action args', () => {
    registerAction('test', (context, a) => `r${a}`);
    registerObserver('test', () => from([2]));
    const $$stream = observerFrom(commandBus)('test');
    $$stream.test('bb').subscribe((res) => {
      expect(res.value).to.have.eq('rbb');
    });
  });
  it('observer execute action args function', () => {
    registerAction('test', (context, a) => `r${a}`);
    registerObserver('test', () => from([2]));
    const $$stream = observerFrom(commandBus)('test');
    $$stream.test(data => data).subscribe((res) => {
      expect(res.value).to.have.eq('r2');
    });
  });
});
