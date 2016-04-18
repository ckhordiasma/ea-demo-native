'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
var cameraModule = require("camera");
// additional requires

ViewModel = new Observable({

    name: '',
    breed: '',
    height: '',
    picture: '',

    events: {
        addHorsePic: 'addHorsePic',
        addHorse: 'addHorse'
    },


    // additional properties


    onAddHorse: function () {
        this.notify({
            eventName: this.events.addHorse,
            name: this.get('name'),
            breed: this.get('breed'),
            height: this.get('height'),
            picture: this.get('picture'),
        });
    },

    onAddHorsePic: function () {
        var self = this;
        cameraModule.takePicture({
                width: 300,
                height: 300,
                keepAspectRatio: true
            })
            .then(function (cameraPicture) {
                self.set('picture', cameraPicture);
                
            })

        .then(function () {
            
            
            self.notify({
                eventName: self.events.addHorsePic,
                horsePic: self.get('picture')
            });
        });


    }



});

// START_CUSTOM_CODE_masterDetailViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_masterDetailViewModel
module.exports = ViewModel;