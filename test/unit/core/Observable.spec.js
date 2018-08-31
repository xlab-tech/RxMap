/* global describe,it */
import { expect } from 'chai';
import { of } from 'rxjs/internal/observable/of';
import { registerObserver } from '../../../src/core/registerObserver';
import rxMap from '../../../src/map/RxMap';

describe('Observable', () => {
  it('observer', () => {
    registerObserver('test', () => of(2));
    return new Promise((resolve, reject) => {
      const $strem = rxMap.observer(of(5));
      $strem.observer('test').subscribe((res) => {
        expect(res).to.eq(2);
      }, reject, resolve);
    });
  });

  it('observer params', () => {
    registerObserver('test', (context, param) => of(param));
    return new Promise((resolve, reject) => {
      const $strem = rxMap.observer(of(5));
      $strem.observer('test', 3).subscribe((res) => {
        expect(res).to.eq(3);
      }, reject, resolve);
    });
  });
});
