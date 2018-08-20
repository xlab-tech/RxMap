/* global describe,it */
import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import RxMap from '../../../src/RxMap';
import CommandBus from '../../../src/core/CommandBus';
import { registerObserver } from '../../../src/core/registerObserver';


describe('Register Observer', () => {
  jsdom({
    url: 'https://example.org/',
  });

  it('register Observable', () => {
    expect(CommandBus).to.respondTo('observer');
    expect(Observable).to.respondTo('observer');

    registerObserver('test', () => of(1));

    const res = RxMap.observer('test');
    const res2 = of(1).observer('test');
    expect(res).to.instanceOf(Observable);
    expect(res2).to.instanceOf(Observable);
  });
});
