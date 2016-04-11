'use strict';

var isInit = true,
    helpers = require('../../../utils/widgets/helper'),
    // additional requires
    dataService = require('../../../dataProviders/eaDemoNative'),
    viewModel = require('./addItemForm-view-model'),
    horseService = require('./addItemForm-service');

function onRequestSuccess() {
    helpers.back();
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

exports.onCancelTap = function onCancelTap() {
    helpers.back();
};

function onAddHorse(data) {
    
    //alert(data.name);
    var horseData = {
        name: viewModel.name,
        breed: viewModel.breed,
        height: viewModel.height
    }
        
    
    horseService.addHorse(horseData, onRequestSuccess, onRequestFail);
}

exports.onAddHorse  = onAddHorse;

// additional functions
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);

    viewModel.set('name', '');
    viewModel.set('breed', '');
    viewModel.set('height', '');

    // init properties

    page.bindingContext = viewModel;
    
    //just some stuff I copied from homeview, not sure if it is right.
    
    if (isInit) {
        isInit = false;
        viewModel.on(viewModel.events.addHorse, onAddHorse);
    } 
    
    // additional pageLoaded
}

// START_CUSTOM_CODE_masterDetailViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_masterDetailViewModel
exports.pageLoaded = pageLoaded;