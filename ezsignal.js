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
            self._allFunc = []
        })();

        this._removeValueFromArray = function(xArray, xValue){
            xArray.forEach(function(value, index, array){
                if(value === xValue){
                    array.splice(index, 1);
                    return ;
                }
            })
        }

        this._removeChannelListen = function(channelName, rfunc){
            var funcList = self._channel[channelName] || [];
            this._removeValueFromArray(funcList, rfunc);
        }

        this.trigger = this.pub = this.publish = function(channelName){
            return function(){
                var args = arguments;
                // shadow copy the channelList to avoid potential problem
                var funcList = (self._channel[channelName] || []).slice(0);
                funcList.forEach(function(func, index, array){
                    func.apply(this, args);
                    if(func.__once){
                        self._removeChannelListen(channelName, func);
                        self._removeValueFromArray(self._allFunc, func);
                    }
                })
            }
        };

        this.triggerAll = this.pubAll = this.publishAll = function(){
            return function(){
                var args = arguments;
                var allFunc = self._allFunc.slice(0);
                allFunc.forEach(function(func, index, array){
                    func.apply(this, args);
                    if(func.__once){
                        self._removeChannelListen(func.__channelName, func);
                        self._removeValueFromArray(self._allFunc, func);
                    }
                })
            }
        }

        this.listenToOnce = this.once = function(channelName, func){
            func.__once = true;
            this.on(channelName, func);
        }

        this.on = this.listenTo = this.sub = this.subscribe = function(channelName, func){
            this._allFunc.unshift(func);
            func.__channelName = channelName;
            _mapAppend(self._channel, channelName, func, true);
        };

        this.off = this.clearChannel = function(channelName){
            if(!channelName){
                this.clearAllChannel();
            }

            if(this._channel.hasOwnProperty(channelName)){
                delete this._channel[channelName];
            }
        };

        this.clearAllChannel = function(channelName){
            var self = this;
            Object.getOwnPropertyNames(self._channel).forEach(function(key, idx, array) {
                delete self._channel[key]
            });
        }

    }

    // static fucntions

    EZSignal.createChannel = function(complexName, func){ 
        // a easy way to create channel
        // channel name should contain :, such as signalname:channelname
        var splitChar = ":";
        var splitIndex = complexName.indexOf(splitChar);
        if(splitIndex === -1){
            throw new Error("channel name should contain `:` such as 'signalname:channelname'");
        }

        var signalName = complexName.slice(0, splitIndex);
        var channelName = complexName.slice(splitIndex+1, complexName.length);
        var signal = EZSignal.getSignalByName(signalName);
        signal.sub(channelName, func);
        return signal.pub(channelName);

    }

    EZSignal.getSignalByName = function(channelName){
        return _namespace[channelName] || new EZSignal(channelName);
    }

    return EZSignal;
});


