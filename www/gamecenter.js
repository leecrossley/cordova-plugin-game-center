
var exec = require("cordova/exec");

var GameCenter = function () {
    this.name = "GameCenter";
};

GameCenter.prototype.authenticate = function (success, failure) {
    exec(success, failure, "GameCenter", "authenticate", []);
};

module.exports = new GameCenter();
