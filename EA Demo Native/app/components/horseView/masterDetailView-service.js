'use strict';
var _,

    _consts,
    dataService = require('../../dataProviders/eaDemoNative'),
    Everlive = require('../../everlive/everlive.all.min.js'),
    // additional requires

    consts;

consts = {
    PersonID: 'personID',
    UserID: 'userID',
    MembershipID: 'membershipID',
    RoleID: 'roleID'
};

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

Service.prototype.getCurrentMembership = function () {
    return dataService.Users.currentUser();
};

Service.prototype.getCurrentUser = function () {
    return dataService.Users.currentUser();
};



Service.prototype.getAllRecords = function (filter) {
    var expandExp,
        horseData = dataService.data('Horses'),
        horseCoverageData = dataService.data('HorseCoverage'),
        membershipData = dataService.data('Memberships'),
        roleTypeData = dataService.data('RoleTypes');

    var ownerRoleTypeFilter = new Everlive.Query();
    var membershipFilter = new Everlive.Query();
    var horseCoverageFilter = new Everlive.Query();
    var horseFilter = new Everlive.Query();

    //alert((filter.PersonID));

    expandExp = {

        Image: {
            'SingleField': 'Uri'
        },

    };


    ownerRoleTypeFilter.select('Id').where().eq('Name', filter.Role);
    return roleTypeData.get(ownerRoleTypeFilter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this))
        .then(function (roles) {
            // there should only be one role selected (i think), so accessing the first element's ID.
            //alert(JSON.stringify(roles[0].id))
            return membershipFilter.select('Id').where().and().eq('PersonID', filter.PersonID).eq('RoleTypeID', roles[0].Id);
        }).then(function () {
            return membershipData.get(membershipFilter)
                .then(onRequestSuccess.bind(this))
                .catch(onRequestFail.bind(this));

        }).then(function (memberships) {
            //alert(JSON.stringify(memberships[0].Id));
            //alert(JSON.stringify(memberships));
            return horseCoverageFilter.select('HorseID').where().eq('MembershipID', memberships[0].Id);
        }).then(function () {
            return horseCoverageData.get(horseCoverageFilter)
                .then(onRequestSuccess.bind(this))
                .catch(onRequestFail.bind(this));

        }).then(function (horseCoverages) {
            //alert(JSON.stringify(horseCoverages[0].HorseID));
            //alert(JSON.stringify(horseCoverages[0].HorseId));
            //horseFilter.where().eq('Id', horseCoverages[0].HorseID);
            var horseIDsList = [];
            horseCoverages.forEach(function (horseCoverage) {
                horseIDsList.push(horseCoverage.HorseID);
            });

            return horseFilter.where().isin('Id', horseIDsList);

        }).then(function () {
            return horseData.expand(expandExp).get(horseFilter)
                .then(onRequestSuccess.bind(this))
                .catch(onRequestFail.bind(this));
        });

};
// additional properties

// START_CUSTOM_CODE_masterDetailView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_masterDetailView
module.exports = new Service();