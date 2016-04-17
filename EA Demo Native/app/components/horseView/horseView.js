'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),

    service = require('./horseView-service'),
    // additional requires
    localSettings = require('application-settings'),
    consts,
    viewModel = require('./horseView-view-model');


consts = {
    accessTokenKey: 'accessTokenType',
    accessTokenTypeKey: 'accessTokenType',
    accessTokenPrincipalIdKey: 'accessTokenPrincipalId',
    personIdKey: 'personId',
    membershipIdKey: 'membershipId',
    roleIdKey: 'roleId'
};

function onListViewItemTap(args) {
    var itemData = viewModel.get('listItems')[args.index];

    helpers.navigate({
        moduleName: 'components/horseView/horseDetails/horseDetails',
        context: itemData.details
    });
}
exports.onListViewItemTap = onListViewItemTap;

function onAddItemTap(args) {
    
    
    helpers.navigate({
        moduleName: 'components/horseView/addHorseForm/addHorseForm',
      
    });
}
exports.onAddItemTap = onAddItemTap;

function flattenLocationProperties(dataItem) {
    var propName, propValue,
        isLocation = function (value) {
            return propValue && typeof propValue === 'object' &&
                propValue.longitude && propValue.latitude;
        };

    for (propName in dataItem) {
        if (dataItem.hasOwnProperty(propName)) {
            propValue = dataItem[propName];
            if (isLocation(propValue)) {
                dataItem[propName] =
                    'Latitude: ' + propValue.latitude +
                    'Longitude: ' + propValue.longitude;
            }
        }
    }
}
// additional functions

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    viewModel.set('isLoading', true);
    viewModel.set('listItems', []);

    function _fetchData() {
        var context = page.navigationContext;
        //alert(JSON.stringify(context));
        if (context && context.filter) {
            return service.getAllRecords(context.filter);
        }

        return service.getAllRecords();
    };

    _fetchData()
        .then(function (result) {
            var itemsList = [];

            result.forEach(function (item) {
                //alert(item.Breed);
                flattenLocationProperties(item);

                itemsList.push({

                    icon: '\ue0dc', //globe
                    image: item.Image,
                    name: item.Name,
                    breed: item.Breed,
                    height: item.Height + ' Hands',
                    details: item
                });
            });

            viewModel.set('listItems', itemsList);
            viewModel.set('isLoading', false);
        })
        .catch(function onCatch() {
            viewModel.set('isLoading', false);
        });
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        // additional pageInit
    }
}

// START_CUSTOM_CODE_masterDetailView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_masterDetailView
exports.pageLoaded = pageLoaded;