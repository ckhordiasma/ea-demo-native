'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    backButtonHidden: true,

    pageTitle: 'Home View',

    signinVisibility: 'visible',
    registerVisibility: 'collapsed',
    displayName: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    cellNumber: '',

    events: {
        register: 'register',
        showRegister: 'showRegister',
        showSignin: 'showSignin',
        signin: 'signin'
    },

    onSignin: function() {
        this.notify({
            eventName: this.events.signin,
            email: this.get('email'),
            password: this.get('password')
        });
    },

    onShowRegister: function() {
        this.set('signinVisibility', 'collapsed');
        this.set('registerVisibility', 'visible');
    },

    onRegister: function() {
        this.notify({
            eventName: this.events.register,
            displayName: this.get('displayName'),
            password: this.get('password'),
            email: this.get('email'),
            firstName: this.get('fistName'),
            lastName: this.get('lastName'),
            cellNumber: this.get('cellNumber')
        });
    },

    onShowSignin: function() {
        this.set('signinVisibility', 'visible');
        this.set('registerVisibility', 'collapsed');
    },
    // additional properties

});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
module.exports = ViewModel;