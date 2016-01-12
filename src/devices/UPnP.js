/* @flow */

var Device = require('./Device');
var MediaRenderer = require('upnp-mediarenderer-client');

class UPnP extends Device {
    host: string;
    name: string;
    xml: string;
    type: string;
    _player: any;

    constructor(opts: Object) {
        super();
        this.host = opts.address;
        this.name = opts.name;
        this.xml = opts.xml;
        this.type = opts.type;
    }

    play(url: string, timestamp: number): void {
        if (this._player) this._player.stop();

        this._player = new MediaRenderer(this.xml);
        this._player.load(url, { autoplay: true }, err => {
            if (err) return this.emit('error', err);
            this._player.seek(timestamp);
        });
    }

    stop(): void {
        if (!this._player) return;

        this._player.stop(() => {
            this._player = null;
        });
    }
}

module.exports = UPnP;
