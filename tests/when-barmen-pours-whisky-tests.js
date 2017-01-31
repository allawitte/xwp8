var assert = require('assert');
var expect = require('chai').expect;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var ImageDownloader = require('../src/image-downloader');
var fs = require('fs');
var username = require('username');

suite('when barmen pours whisky', function () {
    let barmen = new Barmen();
    let me = new Visitor();
    var whisky = "whisky.jpg";

    setup(function (done) {

        this.timeout(20000);
        me.sober();
        barmen.free();

        done();
    });

    suite('i ask 50 grams', function () {

        var iAskVolume = 50;
        var volumeInGlass = barmen.pour(whisky, iAskVolume);
        test('I get whisky', function (done) {

            assert.equal(iAskVolume, volumeInGlass);

            done();

        });
        test('I drink whisky', function(){
            var iDrinkVolume = me.drink(volumeInGlass);
            assert.equal(iDrinkVolume, volumeInGlass);
        })
    });

    suite('i ask -10 grams', function () {
        test("I can't ask barmen pours negative amount of whisky", function (done) {

            var iAskVolume = -10;

            expect(() => barmen.pour(whisky, iAskVolume)).to.throw(/Invalid volume of whisky/);
            done();

        });
    });

    suite('i ask 500 grams', function () {
        test('Barmen said there is no such glass', function (done) {

            var iAskVolume = 500;

            expect(() => barmen.pour(whisky, iAskVolume)).to.throw(/There is no such glass/);
            done();
        });

    });

    suite('i ask 199 grams', function () {
        test('Barmen pours 199 grams ', function (done) {

            var iAskVolume = 199;
            var volumeInGlass = barmen.pour(whisky, iAskVolume);
            assert.equal(volumeInGlass, iAskVolume);
            done();
        });

    });

    teardown(function () {

    })
});