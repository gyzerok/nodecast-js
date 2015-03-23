/* @flow */

var EventEmitter = require('events').EventEmitter;
var dgram = require('dgram');

var BROADCAST_ADDR: string = '239.255.255.250';
var BROADCAST_PORT: number = 1900;
var M_SEARCH: string = 'M-SEARCH * HTTP/1.1\r\nHost: ' + BROADCAST_ADDR + ':' + BROADCAST_PORT + '\r\nMan: "ssdp:discover"\r\nST: %st\r\nMX: 3\r\n\r\n';
var SEND_INTERVAL: number = 5000;

var ssdpHeader = /^([^:]+):\s*(.*)$/;

function noop(): void { return undefined; }

function getHeaders(res: Object): Object<string, mixed> {
    var lines = res.split('\r\n');

    var headers = {};

    lines.forEach(function (line: string): void {
        if (line.length) {
            var pairs = line.match(ssdpHeader);
            if (pairs) headers[pairs[1].toUpperCase()] = pairs[2]; // e.g. {'HOST': 239.255.255.250:1900}
        }
    });

    return headers
}

function getStatusCode(res: Object): number {
    var lines = res.split('\r\n');
    var type = lines.shift().split(' '); // command, such as "NOTIFY * HTTP/1.1"

    return parseInt(type[1], 10);
}

function parseResponse(message, rinfo) {
    if (this._processed.indexOf(rinfo.address) !== -1) return;

    var response = message.toString();
    if (getStatusCode(response) !== 200) return;
    var headers = getHeaders(response);

    this._processed.push(rinfo.address);
    this.emit('response', headers, rinfo);
}

function send(st: string): void {
    var message = new Buffer(M_SEARCH.replace('%st', st), 'ascii');
    this._socket.send(message, 0, message.length, BROADCAST_PORT, BROADCAST_ADDR, noop);
}

class SSDP extends EventEmitter {
    _processed: Array<string>;
    _socket: any;
    _interval: any;

    constructor(port: number) {
        this._processed = [];
        this._socket = dgram.createSocket('udp4');
        this._socket.on('message', parseResponse.bind(this));
        this._socket.bind(port, () => {
            this._socket.addMembership(BROADCAST_ADDR);
        });
    }

    search(st: string): void {
        send.call(this, st);
        this._interval = setInterval(send.bind(this, st), SEND_INTERVAL);
    }

    onResponse(cb: Function): void {
        this.on('response', cb);
    }

    destroy(): void {
        this._socket = null;
        if (!this._interval) return;
        clearInterval(this._interval);
    }
}

module.exports = SSDP;
