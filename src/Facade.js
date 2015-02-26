'use strict';

var EventEmitter = require('events').EventEmitter;
var SSDPBrowser = require('./SSDPBrowser');
var DeviceStore = require('./DeviceStore');

var CHANGE_EVENT = 'nodecast-js:device';

class Facade extends EventEmitter {

    consctructor() {
        this._browser = new SSDPBrowser();
        this._deviceStore = new DeviceStore();
        this._deviceStore
    }

    start() {

    }

    onChange(cb) {
        this.on(CHANGE_EVENT, cb);
    }

    offChange(cb) {
        this.removeListener(CHANGE_EVENT, cb);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    destroy() {
        this.removeListerner(CHANGE_EVENT);
    }
}

module.exports = {};