/*!
 @package noty - jQuery Notification Plugin
 @version version: 2.2.4
 @contributors https://github.com/needim/noty/graphs/contributors

 @documentation Examples and Documentation - http://needim.github.com/noty/

 @license Licensed under the MIT licenses: http://www.opensource.org/licenses/mit-license.php
 */

// WARNING: Require Animate.css
// Examples:
// $noty.message({text: 'Text'});
// $noty.dialog({text: 'Text'}).then(function(){ console.log('Dialog OK') });

angular.module('noty', []).factory('$noty', ['$q', '$timeout', function ($q, $timeout) {

    angular.extend($.noty.defaults, {
        theme: 'relax',
        type: 'warning',
        layout: 'topCenter',
        timeout: 4000,
        animation : {
            open  : 'animated flipInX',
            close : 'animated flipOutX'
        }
    });
    var globalOptions = $.noty.defaults;

    var service = {
        defaultOptions: globalOptions,
        show: function(options){
            return noty(angular.extend({}, globalOptions, options));
        },
        message: function(options){
            var messageOptions = {animation: {open: 'animated bounceInRight'}, type: 'information', layout: 'bottomRight', timeout: 10000};
            return noty(angular.extend({}, globalOptions, messageOptions, options));
        },
        dialog: function(options){
            return $q(function(resolve, reject) {
                var dialogOptions = {
                    timeout: false,
                    type: 'confirm',
                    layout: 'center',
                    animation : {
                        open: 'animated tada',
                        close : 'animated bounceOut'
                    },
                    buttons: [
                        {addClass: 'btn btn-danger', text: 'Ок', onClick: function($noty) {
                            // this = button element
                            // $noty = $noty element
                            $noty.close();
                            resolve();

                            $timeout(function(){
                                //If something happening, and noty dont closed
                                if($noty.$bar.hide)
                                    $noty.$bar.hide();
                            }, 1000)
                        }
                        },
                        {addClass: 'btn btn-default', text: 'Отмена', onClick: function($noty) {
                            $noty.close();
                            reject();
                        }
                        }
                    ]
                };

                noty(angular.extend({}, globalOptions, dialogOptions, options));
            });
        },
        closeAll: function () {
            return $.noty.closeAll()
        },
        closeById: function (_noty) {
            return $.noty.close(_noty.options.id)
        },
        clearShowQueue: function () {
            return $.noty.clearQueue();
        }.bind(this)
    };
    return service;
}]);