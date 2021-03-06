'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),

    service = require('./loginView-service'),
    localSettings = require('application-settings'),
    // additional requires

    viewModel = require('./loginView-view-model');

function validateData(data) {
    if (!data.email) {
        alert('Missing email');
        return false;
    }

    if (!data.password) {
        alert('Missing password');
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

function signinSuccess(personRoleMembershipData) {
    //helpers.navigate('components/masterDetailView/masterDetailView');
    /***
       alert(JSON.stringify(service.getCurrentUser().then(function(data){
           return data;
       })));
       **/
    // on sign in success, redirect to the navigation menu with all the various options.
    //alert(JSON.stringify(personRoleMembershipData));
    service.getCurrentUser().then(function (data) {
            //alert(JSON.stringify(data));
            

            var navigationEntry = {
                moduleName: "components/horseView/horseView",
                context: {
                    filter: personRoleMembershipData
                },
                animated: false
            };
            helpers.navigate(navigationEntry);
        },
        function (error) {
            alert(JSON.stringify(error));
        });

}

function onSignin(data) {

    if (validateData(data)) {
        data.email = data.email.toLowerCase();
        service.signin(data, signinSuccess, authError);
    }
}

function registerSuccess() {
    alert("Registration Success!");
    //on registration success, redirect to the profile input page. this doesn't work right now because the profile input page is broken.
    //helpers.navigate('components/profileInputPage/profileInputPage');

    //on registration success, go do navigation menu
    //helpers.navigate('navigation/navigation');

    //on registration success, sign in.
}

function onRegister(data) {
    if (validateData(data)) {
        data.email = data.email.toLowerCase();
        service.register(data, function () {
            registerSuccess();
            service.signin(data, signinSuccess, authError);
        }, authError);

    }
}

function onShowRegister() {
    viewModel.onShowRegister();
}

function onShowSignin() {
    viewModel.onShowSignin();
}

// additional functions

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    //alert(page.navigationContext);
    //alert(page.navigationContext.logout);

    // I think navigationContext and navigationContext.logout are placeholders. 
    /**
    if (page.navigationContext && page.navigationContext.logout) {
        service.signout(onShowSignin, onShowSignin);
    } else {
        if (service.isAuthenticated()) {
            service.setAuthorization();
            signinSuccess();
        }
    }
    */
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        viewModel.on(viewModel.events.signin, onSignin);
        viewModel.on(viewModel.events.register, onRegister);
        viewModel.on(viewModel.events.showRegister, onShowRegister);
        viewModel.on(viewModel.events.showSignin, onShowSignin);

        // additional pageInit

    }
}

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
exports.pageLoaded = pageLoaded;