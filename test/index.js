var predict = require('..')
var mean = require('../src/running-mean')
var kefir = require('kefir')
// test on my own corpus
var corpus = 'fdffdddfffdfdfdffdffdffdffdfdfdffdfffdfdfdfdfdfdfdffdffdfdffdfdffdfdffdfdfdfdfdffdfdfdfdffdfdffdfdfdffdffdffdffdffdfdfdfdfdfdfdffdffdffdffdffdffdffdffdffdffdffdfdfdfdfdffdfdfdfdfdfdfdffdffdfdfdfdfdf'.split('')
var mockInputS = kefir.sequentially(3, corpus)
mean(predict(mockInputS)).debounce(10).log('my corpus')

// test on a random corpus! should get 50%
var well1024a = require('prng-well1024a')
var rng = well1024a([Date.now(), process.pid]);
function randomLetter () {
  var number = rng.getUInt32();
  return ['d', 'f'][number % 2];
}
var rands = []
for (var i=0;i<50;i++)
  rands.push(randomLetter())
// random key presses
var randomInputS = kefir.sequentially(3, rands)
mean(predict(randomInputS)).debounce(10).log('random generator')
