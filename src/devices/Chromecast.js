'use strict';

var Device = require('./Device');
var Client = require('castv2-client').Client;
var MediaReceiver = require('castv2-client').DefaultMediaReceiver;

class Chromecast extends Device {

    constructor(opts) {
        this.host = opts.address;
        this.name = opts.name;
        this.xml = opts.xml;
        this.type = opts.type;
    }

    play(url, timestamp) {
        if (this._client) this._client.close();

        this._client = new Client();
        this._client.connect(this.host, err => {
            if (err) return this.emit('error', err);

            this._client.launch(MediaReceiver, (err, player) => {
                if (err) return this.emit('error', err);

                this._player = player;

                var opts = {
                    autoplay: true,
                    currentTime: timestamp
                };

                var content = {
                    contentId: url,
                    contentType: 'video/mp4'
                };

                this._player.load(content, opts, err => {
                    if (err) return this.emit('error', err);
                });
            });
        });
    }

    stop() {
        this._player.stop();
    }
}

module.exports = Chromecast;