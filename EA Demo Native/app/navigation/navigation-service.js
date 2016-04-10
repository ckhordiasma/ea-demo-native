'use strict';
var _,

    _consts,
    dataService = require('../dataProviders/eaDemoNative'),
    //Everlive = require('../../everlive/everlive.all.min.js'),
    // additional requires

    consts;

function Service() {}

function onRequestSuccess(data) {
    return data.result;
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

Service.prototype.getCurrentUser = function () {
    return dataService.Users.currentUser();
};

Service.prototype.isAuthenticated = function () {
    return localSettings.getString(consts.accessTokenKey) &&
        localSettings.getString(consts.accessTokenTypeKey) &&
        localSettings.getString(consts.accessTokenPrincipalIdKey);
};

module.exports = new Service();