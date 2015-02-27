nodecast-js
===========

Nodecast-js is a simple module for streaming media to Chromecast/UPnP/DLNA.

## Installation
    
    npm install nodecast-js --save

## Usage

```javascript
var Browser = require('nodecast-js');

var url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';
var timestamp = 60; // in seconds

var browser = new Browser();
browser.onDevice(function (device) {
    device.onError(function (err) {
        console.log(err);
    });

    device.play(url, timestamp);
});
browser.start();

browser.getList(); // list of currently discovered devices

browser.destroy(); // destroy your browser
```
