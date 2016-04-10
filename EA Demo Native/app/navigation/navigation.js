'use strict';
var helpers = require('../utils/widgets/helper'),
    navigationViewModel = require('./navigation-view-model'),
    navigationService = require('./navigation-service');

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = navigationViewModel;
    navigationViewModel.set('pageTitle', 'Equine Assistant');
}

function menuItemTap(args) {
    function _getUser() {
        return navigationService.getCurrentUser();
    }

    _getUser()
        .then(function (userResult) {
            var personFilter = {
                'PersonID': userResult.result.PersonID,
                'Role': 'HorseOwner'
            };
            return personFilter;
        })
        .then(function (personFilter) {
            navigationViewModel.menuItems.forEach(function (menuItem) {
                menuItem.context = {
                    'filter': personFilter
                };
            });
            helpers.navigate(navigationViewModel.menuItems[args.index]);
        });
}

exports.pageLoaded = pageLoaded;
exports.menuItemTap = menuItemTap;