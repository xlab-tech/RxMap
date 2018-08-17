import {
  describe, it,
} from 'mocha';
import jsdom from 'mocha-jsdom';
import { expect } from 'chai';

import RxMap from '../../../src/RxMap';
import AsyncCommandBus from '../../../src/core/AsyncCommandBus';
import { registerCommand } from '../../../src/core/registerCommand';

describe('RxMap', () => {
  jsdom({
    url: 'https://example.org/',
  });
  it('create new Map Instances', () => {
    const m = RxMap.init();
    expect(Map).to.be.not.equal(m);
  });
  it('commands return AsyncCommand', () => {
    registerCommand('test', () => 'test');
    expect(RxMap).to.respondTo('test');
    const ret = RxMap.test();
    expect(ret).to.be.an.instanceof(AsyncCommandBus);
  });
});
