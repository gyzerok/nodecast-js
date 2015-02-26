'use strict';

var SSDP = require('./SSDP');
var EventEmitter = require('events').EventEmitter;
var http = require('http');

function getXML(address, cb) {
    http.get(address, function (res) {
        var body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => cb(body));
    });
}

function search(ssdp, cb) {
    ssdp.onResponse((headers, rinfo) => {
        if (!headers['LOCATION'] || headers['LOCATION'].indexOf('https://') !== -1) return;
        getXML(headers['LOCATION'], function (xml) {
            cb(headers, rinfo, xml);
        });
    });
}

function getFriendlyName(xml) {
    return xml.match(/<friendlyName>(.+?)<\/friendlyName>/)[1];
}

class Browser extends EventEmitter {

    constructor() {
        this._chromecastSSDP = new SSDP(3333);
        this._upnpSSDP = new SSDP(3334);
    }

    searchChromecast() {
        search(this._chromecastSSDP, (headers, rinfo, xml) => {
            console.log(getFriendlyName(xml));
        });
        this._chromecastSSDP.search('urn:dial-multiscreen-org:service:dial:1');
    }

    searchUPnP() {
        search(this._upnpSSDP, (headers, rinfo, xml) => {
            console.log(getFriendlyName(xml));
        });
        this._upnpSSDP.search('urn:schemas-upnp-org:device:MediaRenderer:1');
    }

    start() {
        this.searchChromecast();
        this.searchUPnP();
    }

    stop() {
        this._chromecastSSDP.destroy();
        this._upnpSSDP.destroy();
    }

    onDevice(cb) {
        this.on('deviceOn', cb);
    }
}

module.exports = Browser;