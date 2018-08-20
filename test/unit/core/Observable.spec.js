/* global describe,it */
import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import { of } from 'rxjs/internal/observable/of';
import '../../../src/core/Observable';
import { registerObserver } from '../../../src/core/registerObserver';
import RxMap from '../../../src/RxMap';

describe('Observable', () => {
  jsdom({
    url: 'https://example.org/',
  });
  it('observer', () => {
    registerObserver('test', () => of(2));
    return new Promise((resolve, reject) => {
      const $strem = RxMap.fromObserver(of(5));
      $strem.observer('test').subscribe((res) => {
        expect(res).to.eq(2);
      }, reject, resolve);
    });
  });

  it('observer params', () => {
    registerObserver('test', (context, param) => of(param));
    return new Promise((resolve, reject) => {
      const $strem = RxMap.fromObserver(of(5));
      $strem.observer('test', 3).subscribe((res) => {
        expect(res).to.eq(3);
      }, reject, resolve);
    });
  });
});
