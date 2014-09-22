## Game Center Plugin for Apache Cordova

This plugin allows developers to utilise the iOS Game Center in their Cordova / PhoneGap app.

The code under active development and currently has support for [auth](#auth), [submitting a score](#submit-score) and [showing leaderboards](#show-leaderboard) using the native viewcontroller.

#### Live demo

See this plugin working in a live app: http://playadds.com

### Before you start

Adding Game Center support requires more than simple coding changes. To create a Game Center-aware game, you need to understand these basics before you begin writing code. The full outline of all the Game Center concepts and impacts can be viewed [here](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/GameKit_Guide/GameCenterOverview/GameCenterOverview.html).

## Install

### Locally

```
cordova plugin add https://github.com/leecrossley/cordova-plugin-game-center.git
```

You **do not** need to reference any JavaScript, the Cordova plugin architecture will add a gamecenter object to your root automatically when you build. It will also automatically add the GameKit framework dependency.

### PhoneGap build

Add the following to your `config.xml` to use version 0.2.9 (you can also omit the version attribute to always use the latest version):

```
<gap:plugin name="uk.co.ilee.gamecenter" version="0.2.9" />
```

## Usage

### Auth

You should do this as soon as your deviceready event has been fired. The plug handles the various auth scenarios for you.

```
var successCallback = function (user) {
    alert(user.alias);
    // user.alias, user.playerID, user.displayName
};

gamecenter.auth(successCallback, failureCallback);
```

### Fetch Player Image

Loads the current player's photo. Automatically cached on first retrieval.

```
var successCallback = function (path) {
    alert(path); // path to .jpg
};

gamecenter.getPlayerImage(successCallback, failureCallback);
```

### Submit Score

Ensure you have had a successful callback from `gamecenter.auth()` first before attempting to submit a score. You should also have set up your leaderboard(s) in iTunes connect and use the leaderboard identifier assigned there as the leaderboardId.

```
var data = {
    score: 10,
    leaderboardId: "board1"
};
gamecenter.submitScore(successCallback, failureCallback, data);
```

### Show leaderboard

Launches the native Game Center leaderboard view controller for a leaderboard.

```
var data = {
    leaderboardId: "board1"
};
gamecenter.showLeaderboard(successCallback, failureCallback, data);
```

*NB: The period option has been removed in 0.3.0 as it is no longer supported by iOS. The default period is "all time".*

### Report achievement

Reports an achievement to the game center:

```
var data = {
	achievementId: "MyAchievementName",
	percent: "100"
};

gamecenter.reportAchievement(successCallback, failureCallback, data);
```

### Reset achievements

Resets the user's achievements and leaderboard.

```
gamecenter.resetAchievements(successCallback, failureCallback);
```

### Fetch achievements

Fetches the user's achievements from the game center:

```
var successCallback = function (results) {
	if (results) {
    	for (var i = 0; i < results.length; i += 1) {
            //results[i].identifier
            //results[i].percentComplete
            //results[i].completed
            //results[i].lastReportedDate
            //results[i].showsCompletionBanner
            //results[i].playerID
        }
    }
}

gamecenter.getAchievements(successCallback, failureCallback);

```

## Platforms

Supports iOS 7 and iOS 8 (may have limited iOS 6 support). The Game Center is Apple specific and not applicable to other platforms.

Please report any [issues](https://github.com/leecrossley/cordova-plugin-game-center/issues/new).

## License

[MIT License](http://ilee.mit-license.org)
