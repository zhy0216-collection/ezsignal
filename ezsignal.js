// influced by https://github.com/bigeasy/signal
// Backbone.Events

!function(definition) {
    if (typeof module == "object" && module.exports) module.exports = definition();
    else if (typeof define == "function") define(definition);
    else this.ezsignal = definition();
}(function() {
    'use strict'
    var _namespace = {}; // name: [Signal, ]

    function _mapAppend(data, key, value, preappend){
        var preappend = preappend || false;
        if(data.hasOwnProperty(key)){
            if(preappend){
                data[key].unshift(value);
            }else{
                data[key].push(value);
            }
        }else{
            data[key] = [value];
        }
    }

    var EZSignal = function(name){
        var self = this;
        (function init(){
            self.name = name;
            _mapAppend(_namespace, name, self);
            self._channel = {} // channelName: [func, ]
        })();

        this.pub = this.publish = function(channelName){

        };

        this.sub = this.subscribe = function(channelName, func){

        };

        this.clearChannel = function(channelName){

        }

    }

    // static fucntions

    EZSignal.createChannel = function(){ // a easy way to create channel

    }

    EZSignal.getSignalByName = function(){

    }

    return EZSignal;
});


