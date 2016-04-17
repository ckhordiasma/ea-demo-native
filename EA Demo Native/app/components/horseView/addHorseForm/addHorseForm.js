'use strict';

var isInit = true,
    helpers = require('../../../utils/widgets/helper'),
    // additional requires
    dataService = require('../../../dataProviders/eaDemoNative'),
    viewModel = require('./addHorseForm-view-model'),

    horseService = require('./addHorseForm-service');

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
        name: data.name,
        breed: data.breed,
        height: data.height
    }


    horseService.addHorse(horseData, onRequestSuccess, onRequestFail);
}

exports.onAddHorse = onAddHorse;

function onAddHorsePic() {
    alert('adding horse pic!');
}
exports.onAddHorsePic = onAddHorsePic;

// additional functions
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);

    if (false) {
        viewModel.set('name', '');
        viewModel.set('breed', '');
        viewModel.set('height', '');
    }
    // init properties

    page.bindingContext = viewModel;

    //just some stuff I copied from homeview, not sure if it is right.

    if (isInit) {
        isInit = false;
        viewModel.on(viewModel.events.addHorse, onAddHorse);
        viewModel.on(viewModel.events.addHorsePic, onAddHorsePic);
    }

    // additional pageLoaded
}

// START_CUSTOM_CODE_masterDetailViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_masterDetailViewModel
exports.pageLoaded = pageLoaded;