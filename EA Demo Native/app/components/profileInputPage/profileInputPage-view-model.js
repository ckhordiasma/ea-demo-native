'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'Profile',

    events: {
        profileInputPageModelSubmit: 'profileInputPageModelSubmit',
        profileInputPageModelCancel: 'profileInputPageModelCancel'
    },

    onprofileInputPageModelFormSubmit: function() {
        this.notify({
            eventName: this.events.profileInputPageModelFormSubmit,
            firstName: this.get('firstName'),
            lastName: this.get('lastName'),
            cellNumber: this.get('cellNumber')
        });
    },

    onprofileInputPageModelFormCancel: function() {
        this.notify({
            eventName: this.events.profileInputPageModelFormCancel
        });
    },
    // additional properties

});

// START_CUSTOM_CODE_profileInputPage
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_profileInputPage
module.exports = ViewModel;