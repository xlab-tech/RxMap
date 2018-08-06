
import { beforeEach, afterEach, describe, it } from 'mocha';
import { expect } from 'chai';

import Map from './../../../src/core/Map.js';
import CommandBus from '../../../src/core/CommandBus.js';
import { Observable } from 'rxjs/Observable.js';

describe('Register commands for execute', () => {

    it('register command', () => {
        expect(Map).to.respondTo('register');
        expect(Observable).to.not.respondTo('testRegister');
        expect(CommandBus).to.not.respondTo('testRegister');
        const func = function () {
            return 'testRegister';
        };
        Map.register('testRegister', func);
        expect(Observable).to.respondTo('testRegister');
        expect(CommandBus).to.respondTo('testRegister');
    });
    it('register Observable', () => {
        expect(Map).to.respondTo('registerObservable');
        expect(CommandBus).to.respondTo('observer');
        expect(Observable).to.respondTo('observer');
        const func = function () {
            return Observable.of(1);
        };
        Map.registerObservable('test', func);
        const res = Map.observer('test');
        const res2 = Observable.of(1).observer('test');
        expect(res).to.instanceOf(Observable);
        expect(res2).to.instanceOf(Observable);

    });

    afterEach(() => {
        delete Observable.prototype.testRegister;
        delete CommandBus.prototype.testRegister;
    });
    
    /*it('execute command', () => {
        const ret = new CommandBus().test();
        console.log('RET:',ret.value().value);
        expect(true).to.be.true;
    });*/
});

