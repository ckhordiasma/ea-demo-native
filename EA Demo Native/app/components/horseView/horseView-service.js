'use strict';
var _,

    _consts,
    dataService = require('../../dataProviders/eaDemoNative'),
    Everlive = require('../../everlive/everlive.all.min.js');
// additional requires





function Service() {}

function onRequestSuccess(data) {
    return data.result;
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}


Service.prototype.getAllRecords = function (filter) {

    var expandExp,
        horseData = dataService.data('Horses'),
        horseCoverageData = dataService.data('HorseCoverage');

    var horseFilter = new Everlive.Query();
    var horseCoverageFilter = new Everlive.Query();


    expandExp = {

        Image: {
            'SingleField': 'Uri'
        },

    };


    horseCoverageFilter.select('HorseID').where().eq('MembershipID', filter.MembershipID);

    return horseCoverageData.get(horseCoverageFilter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this))
        .then(function (horseCoverages) {

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