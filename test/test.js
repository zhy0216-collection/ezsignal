var assert = require("assert");
var EZSignal = require("../ezsignal");

describe('EZSignal', function(){
    var signal = new EZSignal("test");


    describe('#getSignalByName()', function(){
        var testSignal = EZSignal.getSignalByName("test");
        // assert.equal(signal, testSignal);
        it('should assert.equal(signal, testSignal);')
    })

    describe('pub, sub function, no parameters', function(){
        var t = 1;
        signal.sub("test", function(){
            t = 2;
        });
        assert.equal(t, 1);

        // signal.pub("test")();
        it('should trigger sub');
    })

    describe('pub, sub function, with parameters', function(){

        it('should trigger sub');
    })

    describe('pub, sub function, with different namespace', function(){

        it('should not trigger sub');
    })

    describe('pub, sub function, with multiple sub', function(){

        it('should not trigger sub');
    })


})



