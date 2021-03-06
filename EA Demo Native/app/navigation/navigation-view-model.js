'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "Login Page",
    "moduleName": "components/loginView/loginView",
    "icon": "\ue0dd"
}, {
    "title": "Horses",
    "moduleName": "components/horseView/horseView",
    "icon": "\ue0e4"
}, {
    "title": "Profile",
    "moduleName": "components/profileInputPage/profileInputPage",
    "icon": "\ue0e4"
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;