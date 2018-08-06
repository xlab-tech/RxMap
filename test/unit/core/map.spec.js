
import { beforeEach, afterEach, describe, it } from 'mocha';
import { expect } from 'chai';

import rMap from './../../../src/core/Map.js';
import AsyncCommandBus from './../../../src/core/AsyncCommandBus.js';

describe('Create Map', () => {

    it('create new Map Instances', () => {
        const m = rMap.init();
        expect(Map).to.be.not.equal(m);
    });
    it('commands return AsyncCommand', () => {
        const func = function () {
            return 'test';
        };
        rMap.register('test', func);
        expect(rMap).to.respondTo('test');
        const ret = rMap.test();
        expect(ret).to.be.an.instanceof(AsyncCommandBus);
    });
});
