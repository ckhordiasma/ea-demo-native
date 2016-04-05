var provider,
    TelerikBackendServices = require('../everlive/everlive.all.min');

provider = new TelerikBackendServices({

    appId: '3ri3zbrvm04135w8',
    scheme: 'https'
});

// START_CUSTOM_CODE_eaDemoNative
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_eaDemoNative
module.exports = provider;