
var exec = require("cordova/exec");

var GameCenter = function () {
    this.name = "GameCenter";
};

GameCenter.prototype.auth = function (success, failure) {
    exec(success, failure, "GameCenter", "auth", []);
};

GameCenter.prototype.submitScore = function (success, failure, data) {
    exec(success, failure, "GameCenter", "submitScore", [data]);
};

GameCenter.prototype.showLeaderboard = function (leaderboardId) {
    exec(null, null, "GameCenter", "showLeaderboard", [leaderboardId]);
};

module.exports = new GameCenter();
