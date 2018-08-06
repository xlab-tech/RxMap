
import isPromise from '../utils/isPromise.js';
import { Observable } from 'rxjs/Observable.js';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
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

const getArgs = (param, value) => {
    let args = param;
    if (typeof param === 'function') {
        args = param(value);
    }
    if (args && !Array.isArray(args)) {
        args = [args]
    }
    return args;
};

export const registerOperator = (commandName, command) => {

    Observable.prototype[commandName] = function (someCallback) {
        const commandBus = getCommandBus(this);

        return this.mergeMap((value) => {
            let args = getArgs(someCallback, value);
            const result = commandBus.execute(commandName, command, args);

            if (!isPromise(result)) {
                return Observable.of(result);
            }
            return Observable.from(result);
        });
    };
};
