
import {
  afterEach, describe, it,
} from 'mocha';
import { expect } from 'chai';
import jsdom from 'mocha-jsdom';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import RxMap from '../../../src/RxMap';
import CommandBus from '../../../src/core/CommandBus';
import { registerCommand } from '../../../src/core/registerCommand';
import { registerObserver } from '../../../src/core/registerObserver';


describe('Register commands for execute', () => {
  jsdom({
    url: 'https://example.org/',
  });
  it('register command', () => {
    expect(Observable).to.not.respondTo('testRegister');
    expect(CommandBus).to.not.respondTo('testRegister');

    registerCommand('testRegister', () => 'testRegister');

    expect(Observable).to.respondTo('testRegister');
    expect(CommandBus).to.respondTo('testRegister');
  });

  it('register Observable', () => {
    expect(CommandBus).to.respondTo('observer');
    expect(Observable).to.respondTo('observer');

    registerObserver('test', () => of(1));

    const res = RxMap.observer('test');
    const res2 = of(1).observer('test');
    expect(res).to.instanceOf(Observable);
    expect(res2).to.instanceOf(Observable);
  });

  afterEach(() => {
    delete Observable.prototype.testRegister;
    delete CommandBus.prototype.testRegister;
  });
});
