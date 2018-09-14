## Game Center Plugin for Apache Cordova [![npm version](https://badge.fury.io/js/cordova-plugin-game-center.svg)](http://badge.fury.io/js/cordova-plugin-game-center)

This plugin allows developers to utilise the iOS Game Center in their Cordova / PhoneGap app.

The code under active development and currently has support for [auth](#auth), [submitting a score](#submit-score) and [showing leaderboards](#show-leaderboard) using the native viewcontroller.

#### Live demo

See this plugin working in a live app: [playadds.com](http://playadds.com)

### Before you start

Adding Game Center support requires more than simple coding changes. To create a Game Center-aware game, you need to understand these basics before you begin writing code. The full outline of all the Game Center concepts and impacts can be viewed [here](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/GameKit_Guide/GameCenterOverview/GameCenterOverview.html).

## Install

#### Latest published version on npm (with Cordova CLI >= 5.0.0)

```
cordova plugin add cordova-plugin-game-center
```

#### Latest version from GitHub

```
cordova plugin add https://github.com/var77/cordova-plugin-game-center.git
```

You **do not** need to reference any JavaScript, the Cordova plugin architecture will add a gamecenter object to your root automatically when you build. It will also automatically add the GameKit framework dependency.

#### PhoneGap build

Add the following to your `config.xml` to use version 0.4.1 (you can also omit the version attribute to always use the latest version). You should now use the npm source:

```
<gap:plugin name="cordova-plugin-game-center" version="0.4.1" source="npm" />
```

For more information, see the [PhoneGap build docs](http://docs.build.phonegap.com/en_US/configuring_plugins.md.html#Plugins).

**Before building for iOS disable ARC for GameCenter.m file**
> Project -> Build Phases -> Compile Sources -> Double Click on GameCenter.m -> paste -fno-objc-arc
![alt Disable ARC](https://user-images.githubusercontent.com/17221195/45549686-abd04580-b839-11e8-88ab-898cb605ba4f.png) 

## Usage

### Auth with Third Party backend

You should do this as soon as your deviceready event has been fired. The plug handles the various auth scenarios for you.
You need to enable game-center for your app from Itunes Connect
> Sometimes it's needed to add some dummy leaderboard from game-center tab in itunes connect to make it work
```
var successCallback = function (data) {
    alert(data.alias);
    // data.alias, data.bundleId, data.displayName, data.playerId, data.publicKeyUrl, data.salt, data.signature, data.timestamp 
};

gamecenter.generateIdentityVerification(successCallback, failureCallback);
```

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
