/* @flow */

var EventEmitter = require('events').EventEmitter;

class Device extends EventEmitter {

    play(url: string, timestamp: number): void {
        throw 'Not implemented';
    }

    stop(): void {
        throw 'Not implemented';
    }

    onError(cb: Function): void {
        this.on('error', cb);
    }
}

module.exports = Device;
