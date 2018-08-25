/* global describe,it */
import { expect } from 'chai';
import { Observable } from 'rxjs/internal/Observable';
import CommandBus from '../../../src/core/CommandBus';
import RxMap from '../../../src/RxMap';
import { registerCommand } from '../../../src/core/registerCommand';

describe('CommandBus', () => {
  it('create new Command Bus', () => {
    const commandBus = new CommandBus();
    expect(commandBus).to.be.an.instanceof(CommandBus);
    const ret = commandBus.value();
    expect(ret).to.deep.equal({
      value: null,
      name: null,
    });
  });
  it('executing', (done) => {
    registerCommand('test', () => new Promise(resolve => setTimeout(resolve, 500)));
    const bus = RxMap.test();

    setTimeout(() => {
      // eslint-disable-next-line no-unused-expressions
      expect(bus.isExecuting()).to.be.true;
      expect(bus.getCommandName()).to.eq('test');
      done();
    }, 10);
  });
  it('observer data ', () => {
    const $stream = RxMap.observer([5]);
    expect($stream).is.a.instanceOf(Observable);
  });
  it('observer error ', () => {
    try {
      RxMap.observer('kk');
    } catch (err) {
      expect(err).is.a.instanceOf(Error);
    }
  });
});
