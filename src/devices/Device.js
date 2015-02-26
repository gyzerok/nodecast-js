'use strict';

var EventEmitter = require('events').EventEmitter;

class Device extends EventEmitter {

    constructor(opts) {
        this.host = opts.host;
        this.name = opts.name;
        this.xml = opts.xml;
        this.type = opts.type;
    }

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