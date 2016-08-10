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
