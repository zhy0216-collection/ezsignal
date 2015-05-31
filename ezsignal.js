// influced by https://github.com/bigeasy/signal
// Backbone.Events

!function(definition) {
    if (typeof module == "object" && module.exports) module.exports = definition();
    else if (typeof define == "function") define(definition);
    else this.ezsignal = definition();
}(function() {
    'use strict'
    var _namespace = {}; // 

    var EZSignal = function(name){
        var self = this;
        (function init(){
            self.name = name;
        })();

        this.pub = this.publish = function(){

        };

        this.sub = this.subscribe = function(){

        };

    }

    EZSignal.getSignalByName = function(){

    }

    return EZSignal;
});


