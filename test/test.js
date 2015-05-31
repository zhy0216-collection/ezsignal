var assert = require("assert");
var EZSignal = require("../ezsignal");

describe('EZSignal', function(){
    var signal = new EZSignal("test");


    describe('#getSignalByName()', function(){
        it("get the same signals", function(){
            var testSignal = EZSignal.getSignalByName("test");
            assert.equal(signal, testSignal);
        })
    })

    describe('pub, sub function, no parameters', function(){
        
        it('should trigger sub', function(){
            var t = 1;
            signal.sub("test", function(){
                t = 2;
            });
            assert.equal(t, 1);
            signal.pub("test")();
            assert.equal(t, 2);
        });
    })

    describe('pub, sub function, with parameters', function(){

        it('should trigger sub', function(){
            var t = 1;
            signal.sub("test", function(a){
                t = 2 + a;
            });
            assert.equal(t, 1);
            signal.pub("test")(3);
            assert.equal(t, 5);
            signal.pub("test")(4);
            assert.equal(t, 6);
        });
    })

    describe('pub, sub function, with different namespace', function(){

        it('should not trigger sub');
    })

    describe('pub, sub function, with multiple sub', function(){

        it('should not trigger sub');
    })


})



