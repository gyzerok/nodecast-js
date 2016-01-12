/* @flow */

var SSDP = require('./SSDP');
var EventEmitter = require('events').EventEmitter;
var http = require('http');
var Chromecast = require('./devices/Chromecast');
var UPnP = require('./devices/UPnP');
var Device = require('./devices/Device');

function getXML(address: string, cb: (xml: string) => void): void {
    http.get(address, function (res: any): void {
        var body: string = '';
        res.on('data', function (chunk: Buffer): void { body += chunk });
        res.on('end', () => cb(body));
    });
}

function search(ssdp: SSDP, cb: Function) {
    ssdp.onResponse((headers, rinfo) => {
        if (!headers['LOCATION'] || headers['LOCATION'].indexOf('https://') !== -1) return;
        getXML(headers['LOCATION'], xml => {
            cb(headers, rinfo, xml);
        });
    });
}

function getFriendlyName(xml) {
    var matches = xml.match(/<friendlyName>(.+?)<\/friendlyName>/);
    if (!matches) return;
    return matches[1];
}

class Browser extends EventEmitter {
    _chromecastSSDP: SSDP;
    _upnpSSDP: SSDP;
    _devices: Array<Device>;

    constructor() {
        super();
        this._chromecastSSDP = new SSDP(3333);
        this._upnpSSDP = new SSDP(3334);
        this._devices = [];
    }

    searchChromecast(): void {
        search(this._chromecastSSDP, (headers, rinfo, xml) => {

            if (xml.search('<manufacturer>Google Inc.</manufacturer>') == -1) return;
            var name = getFriendlyName(xml);
            if (!name) return;

            var device = new Chromecast({
                name: name,
                address: rinfo.address,
                xml: xml,
                type: 'chc'
            });

            this._devices.push(device);

            this.emit('deviceOn', device);
        });
        this._chromecastSSDP.search('urn:dial-multiscreen-org:service:dial:1');
    }

    searchUPnP(): void {
        search(this._upnpSSDP, (headers, rinfo, xml) => {

            var name = getFriendlyName(xml);
            if (!name) return;

            var device = new UPnP({
                name: name,
                address: rinfo.address,
                xml: headers['LOCATION'],
                type: 'upnp'
            });

            this._devices.push(device);

            this.emit('deviceOn', device);
        });
        this._upnpSSDP.search('urn:schemas-upnp-org:device:MediaRenderer:1');
    }

    start(): void {
        this.searchChromecast();
        this.searchUPnP();
    }

    destroy(): void {
        this._chromecastSSDP.destroy();
        this._upnpSSDP.destroy();
    }

    onDevice(cb: Function): void {
        this.on('deviceOn', cb);
    }

    getList(): Array<Device> {
        return this._devices;
    }
}

module.exports = Browser;
