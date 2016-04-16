'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),

    gestures = require('ui/gestures'),
    // additional requires

    viewModel = require('./profileInputPage-view-model');
var dataService = require('../../../dataProviders/eaDemoNative');

function validateData(data) {
    if (!data.firstName) {
        alert('Missing first name');
        return false;
    }

    if (!data.lastName) {
        alert('Missing last name');
        return false;
    }

    if (!data.cellNumber) {
        alert('Missing cell phone number');
        return false;
    }

    return true;
}

function authError(error) {
    if (error) {
        if (error.message) {
            alert(error.message);
        }

        return false;
    }
}

function onprofileInputPageModelFormSubmit() {
    /**
    var data = dataService.data('People');

    function _getCurrentUser() {
        return dataService.Users.currentUser();
    };

    _getCurrentUser().then(function (userResult) {
        data.save({

                Id: userResult.result.PersonID,
                FirstName: viewModel.get('firstName'),
                LastName: viewModel.get('lastName'),
                CellNumber: viewModel.get('cellNumber'),

            })
            .then(onRequestSuccess.bind(this))
            .catch(onRequestFail.bind(this));

    });
    **/
    helpers.back();
}

function onprofileInputPageModelFormCancel() {
    helpers.back();
}

// additional functions
exports.onprofileInputPageModelFormSubmit = onprofileInputPageModelFormSubmit;
exports.onprofileInputPageModelFormCancel = onprofileInputPageModelFormCancel;

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        viewModel.on(viewModel.events.profileInputPageModelSubmit, onprofileInputPageModelFormSubmit);

        viewModel.on(viewModel.events.profileInputPageModelCancel, onprofileInputPageModelFormCancel);

        // additional pageInit

    }
}

// START_CUSTOM_CODE_profileInputPage
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_profileInputPage
exports.pageLoaded = pageLoaded;