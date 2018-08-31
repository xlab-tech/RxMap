/* global describe,it */
import { expect } from 'chai';
import observableStore from '../../../src/core/observableStore';
import { doesNotReject } from 'assert';

describe('Register ObservableStore', () => {
  it('add Observable function', (done) => {
    const store = observableStore();
    try {
      store.observer = 5;
    } catch (err) {
      expect(err).to.have.instanceof(Error);
      done();
    }
  });
});
