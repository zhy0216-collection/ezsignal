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
            self.name = name || "ezsignal";
            if(_namespace.hasOwnProperty(name)){
                throw new Error('signal:' + name + " exsists");
            }
            _namespace[name] = self;
            self._channel = {} // channelName: [func, ]
        })();

        this.pub = this.publish = function(channelName){
            return function(){
                var args = arguments;
                var funcList = self._channel[channelName] || [];
                funcList.forEach(function(func, index, array){
                    func.apply(this, args);
                })
            }
        };

        this.sub = this.subscribe = function(channelName, func){
            _mapAppend(self._channel, channelName, func);
        };

        this.clearChannel = function(channelName){

        };

        this.clearAllChannel = function(){

        }

    }

    // static fucntions

    EZSignal.createChannel = function(){ // a easy way to create channel
        // return _namespace[]
    }

    EZSignal.getSignalByName = function(channelName){
        return _namespace[channelName] || null;
    }

    return EZSignal;
});


