"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var EventEmitter = require("events").EventEmitter;

var Device = (function (EventEmitter) {
  function Device() {
    _classCallCheck(this, Device);

    if (EventEmitter != null) {
      EventEmitter.apply(this, arguments);
    }
  }

  _inherits(Device, EventEmitter);

  return Device;
})(EventEmitter);

module.exports = Device;