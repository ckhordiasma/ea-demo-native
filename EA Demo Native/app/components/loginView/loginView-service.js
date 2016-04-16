'use strict';
var _,

    dataService = require('../../dataProviders/eaDemoNative'),
    localSettings = require('application-settings'),
    // additional requires

    consts;

function Service() {}

consts = {
    accessTokenKey: 'accessTokenType',
    accessTokenTypeKey: 'accessTokenType',
    accessTokenPrincipalIdKey: 'accessTokenPrincipalId',
    personIdKey: 'personId',
    membershipIdKey: 'membershipId',
    roleIdKey: 'roleId'
};

function validateArgs(args) {
    if (!args.email) {
        throw new Error('Service: login - missing email');
    }

    if (!args.password) {
        throw new Error('Service: login - missing password');
    }
}

Service.prototype.signin = function (args, successCallback, errorCallback) {
    validateArgs(args);
    var personID, roleID, membershipID;

    return dataService.Users.login(args.email.trim(), args.password)
        .then(function (e) {

            localSettings.setString(consts.accessTokenKey,
                e.result.access_token);
            localSettings.setString(consts.accessTokenTypeKey,
                e.result.token_type);
            localSettings.setString(consts.accessTokenPrincipalIdKey,
                e.result.principal_id);


            dataService.data('RoleTypes').get({
                'Name': 'HorseOwner'
            }).then(function (roleData) {
                //alert(roleData.result[0].Id);

                roleID = roleData.result[0].Id;

                //alert('User ID: ' + e.result.principal_id);
                //alert('Role ID: ' + roleID);

                return localSettings.setString(consts.roleIdKey, roleID);

            }).then(function () {
                return dataService.Users.getById(e.result.principal_id);
            }).then(function (userData) {
                personID = userData.result.PersonID;
                return localSettings.setString(consts.personIdKey, personID);
            }).then(function () {

                return dataService.data('Memberships').get({
                    'PersonID': personID,
                    'RoleTypeID': roleID
                });

            }).then(function (membershipData) {
                membershipID = membershipData.result[0].Id;
                //alert('Membership ID: ' + membershipID);
                return localSettings.setString(consts.membershipIdKey, membershipID);
            }).then(function () {
                successCallback({
                    'PersonID': personID,
                    'RoleTypeID': roleID,
                    'MembershipID': membershipID
                });
            });

        }, errorCallback);
};

Service.prototype.register = function (args, successCallback, errorCallback) {
    validateArgs(args);

    return dataService.data('People').create({
        FirstName: args.firstName,
        LastName: args.lastName,
        CellNumber: args.cellNumber,
        // save properties
    }).then(function (person) {
        dataService.Users.register(args.email, args.password, {
            Email: args.email,
            DisplayName: args.displayName,
            PersonID: person.result.Id
        });
    }).then(successCallback, errorCallback);
};

Service.prototype.getCurrentUser = function () {
    return dataService.Users.currentUser();
};

Service.prototype.isAuthenticated = function () {
    return localSettings.getString(consts.accessTokenKey) &&
        localSettings.getString(consts.accessTokenTypeKey) &&
        localSettings.getString(consts.accessTokenPrincipalIdKey);
};

Service.prototype.setAuthorization = function () {
    dataService.Users.setAuthorization(
        localSettings.getString(consts.accessTokenKey),
        localSettings.getString(consts.accessTokenTypeKey),
        localSettings.getString(consts.accessTokenPrincipalIdKey));
};
// additional properties

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
module.exports = new Service();