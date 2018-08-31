/* global describe,it,afterEach,beforeEach */
import { expect } from 'chai';
import { from } from 'rxjs/internal/observable/from';
import CommandBus from '../../../src/core/CommandBus';
import AsyncCommandBus from '../../../src/core/AsyncCommandBus';
import { observerFrom } from '../../../src/core/proxyObservable';

describe('proxy Observable', () => {
  const commandBus = new CommandBus();
  commandBus._source = 5;
  it('add Observa ble function', () => {
    const $stream = from([1]);
    const $$stream = observerFrom(commandBus)($stream);
    const aux = $$stream.getCommandBus();
    expect(aux).to.have.instanceof(AsyncCommandBus);
  });
});
