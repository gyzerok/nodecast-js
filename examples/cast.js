var Browser = require('nodecast-js');

var url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';
var timestamp = 60; // in seconds

var browser = new Browser();
browser.onDevice(function (device) {
    device.onError(function (err) {
        console.log(err);
    });

    console.log(browser.getList()); // list of currently discovered devices

    device.play(url, timestamp);
});
browser.start();

setTimeout(function () {
    browser.destroy(); // destroy your browser
}, 20000);
