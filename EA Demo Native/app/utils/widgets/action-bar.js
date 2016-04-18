'use strict';

var frameModule = require('ui/frame');
var dataService = require('../../dataProviders/eaDemoNative');

function onBack() {
    // Android only
    var topmost = frameModule.topmost();

    topmost.goBack();
}

function onIndex() {
    var topmost = frameModule.topmost();

    topmost.navigate('navigation/navigation');
}

function onLogout() {
    dataService.authentication.logout(function () {
        alert("Logout successful!");
    }, function (err) {
        alert("Failed to logout: " + err.message);
    });
    var topmost = frameModule.topmost();
	
    //navigate to the login screen (homeView) after logging out.
    topmost.navigate('components/loginView/loginView');
}

exports.onBack = onBack;
exports.onIndex = onIndex;
exports.onLogout = onLogout;