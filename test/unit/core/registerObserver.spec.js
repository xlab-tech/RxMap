/* global describe,it */
import { expect } from 'chai';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import rxMap from '../../../src/RxMap';
import CommandBus from '../../../src/core/CommandBus';
import { registerObserver } from '../../../src/core/registerObserver';

describe('Register Observer', () => {
  it('register Observable', () => {
    expect(CommandBus).to.respondTo('observer');
    registerObserver('test', () => of(1));

    const res = rxMap.observer('test');
    const res2 = rxMap.fromObserver(of(1)).observer('test');
    expect(res).to.instanceOf(Observable);
    expect(res2).to.instanceOf(Observable);
  });
});
