'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "Home View",
    "moduleName": "components/homeView/homeView",
    "icon": "\ue0dd"
}, {
    "title": "Form",
    "moduleName": "components/formView/formView",
    "icon": "\ue204"
}, {
    "title": "Horses",
    "moduleName": "components/masterDetailView/masterDetailView",
    "icon": "\ue0e4"
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;