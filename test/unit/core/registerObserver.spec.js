/* global describe,it */
import { expect } from 'chai';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import rxMap from '../../../src/map/RxMap';
import { registerObserver } from '../../../src/core/registerObserver';

describe('Register Observer', () => {
  it('register Observable', () => {
    expect(rxMap).to.respondTo('observer');
    registerObserver('test', () => () => of(1));
    const res = rxMap.observer('test');
    const res2 = rxMap.observer(of(1)).observer('test');
    expect(res).to.instanceOf(Observable);
    expect(res2).to.instanceOf(Observable);
  });
  it('register and execute Observable', (done) => {
    expect(rxMap).to.respondTo('observer');
    registerObserver('test', () => () => of(1));
    const $res = rxMap.observer('test');
    $res.subscribe((res) => {
      expect(res).to.have.eq(1);
      done();
    });
  });
});
