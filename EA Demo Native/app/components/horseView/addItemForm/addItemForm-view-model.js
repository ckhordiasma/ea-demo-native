'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    name: 'Z Horse',

    breed: 'Zebra',

    height: '14',

    
    //not working!
    
    events: {
        nothing: 'NOTHING',
        addHorse: 'addHorse'
    },
	
    
    // additional properties
    onAddHorse: function () {
        alert('View Model onAddHorse()');
        this.notify({
            eventName: this.events.addHorse,
            name: this.get('name')/**,
            breed: this.get('breed'),
            height: this.get('height')**/
        });
    }
    
});

// START_CUSTOM_CODE_masterDetailViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_masterDetailViewModel
module.exports = ViewModel;