'use strict';
var _,

    dataService = require('../../../dataProviders/eaDemoNative'),
    localSettings = require('application-settings'),
    Everlive = require('../../../everlive/everlive.all.min.js'),
    // additional requires

    consts;

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
    var membershipData = dataService.data('Memberships');
    var roleTypeData = dataService.data('RoleTypes');

    var ownerRoleTypeFilter = new Everlive.Query();
    var membershipFilter = new Everlive.Query();

    ownerRoleTypeFilter.select('Id').where().eq('Name', 'HorseOwner');

    return horseData.create({
            Name: args.name,
            Breed: args.breed,
            Height: args.height,
            // save properties
        })
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this))
        .then(function (horse) {
            //alert('Horse ID: ' + horse.Id);

            return roleTypeData.get(ownerRoleTypeFilter)
                .then(onRequestSuccess.bind(this))
                .catch(onRequestFail.bind(this))
                .then(function (roles) {
                    // there should only be one role selected (i think), so accessing the first element's ID.
                    //alert('Role ID: ' + roles[0].Id);

                    dataService.Users.currentUser()
                        .then(onRequestSuccess.bind(this))
                        .catch(onRequestFail.bind(this))
                        .then(function (user) {
                        	alert('User ID: ' + user.Id);
                        	alert('Role ID: ' + roles[0].Id);
                            return membershipFilter.select('Id').where().and().eq('PersonID', user.Id).eq('RoleTypeID', roles[0].Id);
                        }).then(membershipData.get);
                })
                .then(onRequestSuccess.bind(this))
                .catch(onRequestFail.bind(this))
                .then(function (memberships) {
                    //alert('Membership ID: ' + memberships[0].Id);
                    //alert(JSON.stringify(memberships));
                    return horseCoverageData.create({
                        'HorseID': horse.Id,
                        'MembershipID': memberships[0].Id
                    })
                })
                .then(successCallback, errorCallback);

        });
}
module.exports = new Service();