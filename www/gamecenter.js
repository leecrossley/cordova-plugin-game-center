
var exec = require("cordova/exec");

var GameCenter = function () {
    this.name = "GameCenter";
};

GameCenter.prototype.auth = function (success, failure) {
    exec(success, failure, "GameCenter", "auth", []);
};

module.exports = new GameCenter();
