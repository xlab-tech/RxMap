
import {
  describe, it,
} from 'mocha';
import { expect } from 'chai';
import CommandBus from '../../../src/core/CommandBus';

describe('Create Map', () => {
  it('create new Command Bus', () => {
    const commandBus = new CommandBus();
    expect(commandBus).to.be.an.instanceof(CommandBus);
    const ret = commandBus.value();
    expect(ret).to.deep.equal({
      value: null,
      name: null,
    });
  });
});
