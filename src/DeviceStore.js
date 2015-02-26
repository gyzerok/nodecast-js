'use strict';

var EventEmitter = require('events').EventEmitter;
var SSDPBrowser = require('./SSDPBrowser');

var CHANGE_EVENT = 'nodecast-js:change';

var devices = [];

function appendDevice(data) {
    devices.push(data);

    return true;
}

function clear() {
    devices = [];
    return true;
}

function contains(data) {
    return false;
}

var DeviceStore = {

    emitChange: function emitChange() {
        this.emit(CHANGE_EVENT);
    },

    onChange: function onChange(cb) {
        this.on(CHANGE_EVENT, cb);
    },

    offChange: function (cb) {
        this.removeListener(CHANGE_EVENT, cb);
    },

    getAll: function getAll() {
        return devices;
    }
};

SSDPBrowser.onDevice(function onDevice(data) {
    var didStoreChange = appendDevice(data);
    if (didStoreChange) {
        DeviceStore.emitChange();
    }
});

module.exports = DeviceStore;