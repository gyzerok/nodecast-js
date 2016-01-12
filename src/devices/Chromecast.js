/* @flow */

var Device = require('./Device');
var Client = require('castv2-client').Client;
var MediaReceiver = require('castv2-client').DefaultMediaReceiver;

class Chromecast extends Device {
    host: string;
    name: string;
    xml: string;
    type: string;
    _client: Client;
    _player: any;

    constructor(opts: Object) {
        super();
        this.host = opts.address;
        this.name = opts.name;
        this.xml = opts.xml;
        this.type = opts.type;
    }

    play(url: string, timestamp: number): void {
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

    stop(): void {
        if (!this._player) return;

        this._player.stop(() => {
            this._player = null;
        });
    }
}

module.exports = Chromecast;
