import { getObserver } from './registerObserver.js';
import { Observable } from 'rxjs/Observable.js';
import AsyncCommandBus from './AsyncCommandBus.js';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

const getCommandBus = (source) => {
    const commandBus = source.getCommandBus();
    if (commandBus) {
        return commandBus;
    }
    if (source.source) {
        return getCommandBus(source.source);
    }
};


Observable.prototype.setCommandBus = function (commandBus) {
    this._commandBus = commandBus;
    return this;
};

Observable.prototype.getCommandBus = function (commandBus) {
    return this._commandBus;
};

Observable.prototype.observer = function (observerName, ...args) {
    const commandBus = getCommandBus(this);
    return this.mergeMap((value) => {
        return commandBus.observer(observerName,...args);        
    });
};