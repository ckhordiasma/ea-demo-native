var provider,
    TelerikBackendServices = require('../everlive/everlive.all.min');

provider = new TelerikBackendServices({

    appId: '3ri3zbrvm04135w8',
    scheme: 'https',
    authentication: {
            persist: false,
            onAuthenticationRequired: function() {
                alert('Your access token has expired. Please log in.');
                // Redirect to log-in page
                var topmost = frameModule.topmost();
                topmost.navigate('components/homeView/homeView');
            }
        }
});

// START_CUSTOM_CODE_eaDemoNative
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes



// END_CUSTOM_CODE_eaDemoNative
module.exports = provider;