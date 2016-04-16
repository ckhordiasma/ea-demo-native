var helpers = require('../../../utils/widgets/helper'),

    dialogs = require('ui/dialogs'),

    dataService = require('../../../dataProviders/eaDemoNative');

function navigatedTo(args) {
    var page = args.object;

    page.bindingContext = page.navigationContext;
}

exports.navigatedTo = navigatedTo;