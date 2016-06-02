var predict = require('..')
var mean = require('../src/running-mean')
var kefir = require('kefir')
// test on my own corpus
//var corpus = 'fdffdddfffdfdfdffdffdffdffdfdfdffdfffdfdfdfdfdfdfdffdffdfdffdfdffdfdffdfdfdfdfdffdfdfdfdffdfdffdfdfdffdffdffdffdffdfdfdfdfdfdfdffdffdffdffdffdffdffdffdffdffdffdfdfdfdfdffdfdfdfdfdfdfdffdffdfdfdfdfdf'.split('')
//var mockInputS = kefir.sequentially(3, corpus)
//predict(mockInputS).log('prediction average')

// test on a random corpus! should get 50%

var well1024a = require('prng-well1024a')
var rng = well1024a([Date.now(), process.pid]);

function randomLetter () {
  var number = rng.getUInt32();
  return ['d', 'f'][number % 2];
}

// random key presses
var randomInputS = kefir.withInterval(3, emitter => emitter.emit(randomLetter()))
mean(predict(randomInputS)).log('prediction average')
