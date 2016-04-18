'use strict';
var _,

    dataService = require('../../../dataProviders/eaDemoNative'),
    localSettings = require('application-settings'),
    Everlive = require('../../../everlive/everlive.all.min.js'),
    // additional requires

    consts;

consts = {
    accessTokenKey: 'accessTokenType',
    accessTokenTypeKey: 'accessTokenType',
    accessTokenPrincipalIdKey: 'accessTokenPrincipalId',
    personIdKey: 'personId',
    membershipIdKey: 'membershipId',
    roleIdKey: 'roleId'
};


function Service() {}

function onRequestSuccess(data) {

    return data.result;
}

function onRequestFail(err) {
    alert('Error: ' + JSON.stringify(err));
    return err;
}

Service.prototype.addHorse = function (args, successCallback, errorCallback) {

    var horseData = dataService.data('Horses');
    var horseCoverageData = dataService.data('HorseCoverage');

    var membershipID = localSettings.getString(consts.membershipIdKey, 'no membership ID');
    var pictureCloudFile;

    return dataService.Files.create(args.picture,
        function (data) {
            alert(JSON.stringify(data.result));
            pictureCloudFile = data.result.Id;
            return horseData.create({
                    Name: args.name,
                    Breed: args.breed,
                    Height: args.height,
                    Image: pictureCloudFile
                        // save properties
                })
                .then(onRequestSuccess.bind(this))
                .catch(onRequestFail.bind(this))
                .then(function (horse) {
                    return horseCoverageData.create({
                        'HorseID': horse.Id,
                        'MembershipID': membershipID
                    });
                }).then(successCallback, errorCallback);
        },
        function (error) {});


}
module.exports = new Service();