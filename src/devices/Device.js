'use strict';

var EventEmitter = require('events').EventEmitter;

class Device extends EventEmitter {

    play(opts, timestamp) {
        throw 'Not implemented';
    }

    stop() {
        throw 'Not implemented';
    }

    onError(cb) {
        this.on('error', cb);
    }
}

module.exports = Device;