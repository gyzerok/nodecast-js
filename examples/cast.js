'use strict';

var Browser = require('../lib/Browser');

var url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';
var timestamp = 60; // in seconds

var browser = new Browser();
browser.onDevice(function (device) {
    device.onError(function (err) {
        console.log(err);
    });

    device.play(url, timestamp);

    setTimeout(function () {
        device.stop();
    }, 60000);
});
browser.start();