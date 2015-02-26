'use strict';

var Device = require('./Device');
var MediaRenderer = require('upnp-mediarenderer-client');

class UPnP extends Device {

    constructor(opts) {
        this.host = opts.address;
        this.name = opts.name;
        this.xml = opts.xml;
        this.type = opts.type;
    }

    play(url, timestamp) {
        if (this._player) this._player.stop();

        this._player = new MediaRenderer(this.xml);
        this._player.load(url, { autoplay: true }, err => {
            if (err) return this.emit('error', err);
            this._player.seek(timestamp);
        });
    }

    stop() {
        this._player.stop();
        this._player = null;
    }
}

module.exports = UPnP;