import CommandBus from './CommandBus.js';
import isPromise from '../utils/isPromise.js';

class AsyncCommandBus extends CommandBus {
    constructor() {
        super();
        this.queue = [];
        this.subscribers = [];
        this.async = false;
    }
    setSource(source) {
        this._source = source;
    }
    setMap(map) {
        if (map) {
            this._source && this._source.setMap(map);
            super.setMap(map);
        }
    }
    execute(commandName, command, args) {
        // console.log("ASYNC",this.async);
        if (this.async) {
            this.queue.push({
                commandName: commandName,
                command: command,
                args: args
            });
            return;
        }
        const ret = this._execute(commandName, command, args);
        if (isPromise(ret)) {
            // console.log("Set ASYNC");
            this.async = true;
            ret.then(data => {
                // console.log("DESPUES");
                return this._next()
            })
        }
        return ret;

    }

    _next() {
        if (this.queue.length === 0) {
            this.async = false;
            this._complete();
            return;
        }
        const params = this.queue.shift();
        const ret = this._execute(params.commandName, params.command, params.args);
        if (isPromise(ret)) {
            console.log("Es promesa");
            this.async = true;
            ret.then(data => {
                console.log("DESPUES");
                return this._next()
            })
            return;
        }
        this._next();
    }
    _complete() {
        this.subscribers.map((f) => f(this._lastCommand));
    }
    subscribe(func) {
        this.subscribers.push(func);
    }
}

AsyncCommandBus.lift = function (map, source) {
    const bus = new AsyncCommandBus();
    bus.setMap(map);
    bus.setSource(source);
    return bus;
};

export default AsyncCommandBus;