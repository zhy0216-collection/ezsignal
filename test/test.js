var assert = require("assert");
var EZSignal = require("../ezsignal");

describe('EZSignal', function(){
    var signal = new EZSignal("test");


    describe('#getSignalByName()', function(){
        it("get the same signals", function(){
            var testSignal = EZSignal.getSignalByName("test");
            assert.equal(signal, testSignal);
            assert.equal(EZSignal.getSignalByName("test1"), EZSignal.getSignalByName("test1"));
        })

        it("will throw out a error when create the same signal name", function(){
            function _wrapper(){
                return new EZSignal("test");
            }

            assert.throws(_wrapper, Error, "signal:test exsists")
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

        it('should not trigger sub', function(){
            var testSignal = EZSignal.getSignalByName("test123");
            var t = 1;
            testSignal.sub("test", function(){
                t = 2;
            });
            assert.equal(t, 1);
            signal.pub("test")();
            assert.equal(t, 1);
        });
    })

    describe('pub, sub function, with multiple sub', function(){

        it('should trigger sub',function(){
            var t = 1;
            signal.sub("test", function(a){
                t = a + t;
            });
            signal.sub("test", function(a){
                t = a * t;
            });
            signal.sub("test1", function(a){
                t = a * t * 5;
            });
            assert.equal(t, 1);
            signal.pub("test")(3);
            assert.equal(t, 6); // 
            signal.pub("test")(4); //
            assert.equal(t, 28);
        });
    })

    describe('once', function(){

        it('should trigger once',function(){
            var t = 1;
            signal.once("test", function(a){
                t = a + t;
            });
            assert.equal(t, 1);
            signal.pub("test")(3);
            assert.equal(t, 4); // 
            signal.pub("test")(4); //
            assert.equal(t, 4);
        });
    })

    describe('clearChannel', function(){

        it('should clearChannel',function(){
            var t = 1;
            signal.sub("test", function(a){
                t = 2 + a;
            });
            assert.equal(t, 1);
            signal.pub("test")(3);
            assert.equal(t, 5);

            signal.clearChannel("test1");
            signal.pub("test")(1);
            assert.equal(t, 3);

            signal.clearChannel("test");
            signal.sub("test", function(a){
                t = t * a;
            });
            signal.pub("test")(2);
            assert.equal(t, 6);
        })

        it('should clearAllChannel',function(){
            var t = 1;
            signal.sub("test", function(a){
                t = 2 + a;
            });
            assert.equal(t, 1);
            signal.pub("test")(3);
            assert.equal(t, 5);

            signal.clearAllChannel();
            signal.sub("test", function(a){
                t = t * a;
            });
            signal.pub("test")(2);
            assert.equal(t, 10);
        })

    })


    describe('EZSignal.createChannel', function(){
        it("should trigger func", function(){
            var t = 1;
            var channel = EZSignal.createChannel("test:test", function(x){
                t = t + x;
            })
            assert.equal(t, 1);
            channel(3);
            assert.equal(t, 4);
        })
    })


})



