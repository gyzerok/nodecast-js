nodecast-js
===========

Nodecast-js is a simple module for streaming media to Chromecast/UPnP/DLNA.

[![Build Status](https://travis-ci.org/gyzerok/nodecast-js.svg?branch=master)](https://travis-ci.org/t3chnoboy/thepiratebay)
[![NPM version](https://badge.fury.io/js/nodecast-js.svg)](http://badge.fury.io/js/thepiratebay)
[![Dependency Status](https://img.shields.io/david/gyzerok/nodecast-js.svg)](https://david-dm.org/t3chnoboy/thepiratebay)
[![npm](https://img.shields.io/npm/dm/nodecast-js.svg?maxAge=2592000)]()

## Installation
```bash
npm install nodecast-js --save
```
## Usage

```javascript
const NodeCast = require('nodecast-js');

const url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';
const timestamp = 60; // in seconds
const nodeCast = new NodeCast();

nodeCast.onDevice(device => {
    device.onError(err => {
        console.log(err);
    });
    
    console.log(nodeCast.getList()); // list of currently discovered devices

    device.play(url, timestamp);
});

nodeCast.start();

setTimeout(() => {
    nodeCast.destroy(); // destroy nodecast
}, 20000);
```
