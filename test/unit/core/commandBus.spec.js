
import { beforeEach, afterEach, describe, it } from 'mocha';
import { expect } from 'chai';

import rMap from './../../../src/core/Map.js';
import CommandBus from './../../../src/core/CommandBus.js';

describe('Create Map', () => {

    it('create new Command Bus', () => {
        const commandBus = new CommandBus();
        expect(commandBus).to.be.an.instanceof(CommandBus);
        const ret = commandBus.value();
        expect(ret).to.deep.equal({
            'value': null,
            'name': null
        });
    });
});
