/* global describe,it */
import { expect } from 'chai';
import { Observable } from 'rxjs/internal/Observable';
import CommandBus from '../../../src/core/CommandBus';
import rxMap from '../../../src/RxMap';
import { registerCommand } from '../../../src/core/registerCommand';

describe('CommandBus', () => {
  it('create new Command Bus', () => {
    const commandBus = new CommandBus();
    expect(commandBus).to.be.an.instanceof(CommandBus);
    const ret = commandBus._lastCommand;
    expect(ret).to.deep.equal({
      value: null,
      name: null,
    });
  });

  it('command Bus getSource', () => {
    const commandBus = new CommandBus();
    const temp = commandBus.getSource();
    expect(temp).to.be.eq(commandBus);
  });

  it('command Bus getContext', () => {
    const commandBus = new CommandBus();
    const temp = commandBus.getContext();
    // eslint-disable-next-line no-unused-expressions
    expect(temp).to.be.null;
  });
  it('executing', (done) => {
    registerCommand('test', () => new Promise(resolve => setTimeout(resolve, 500)));
    const bus = rxMap.test();

    setTimeout(() => {
      // eslint-disable-next-line no-unused-expressions
      expect(bus.isExecuting()).to.be.true;
      expect(bus.getCommandName()).to.eq('test');
      done();
    }, 10);
  });
  it('observer data ', () => {
    const $stream = rxMap.observer([5]);
    expect($stream).is.a.instanceOf(Observable);
  });
  it('observer error ', () => {
    try {
      rxMap.observer('kk');
    } catch (err) {
      expect(err).is.a.instanceOf(Error);
    }
  });
});
