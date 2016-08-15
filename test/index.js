var predict = require('..')
var mean = require('../src/running-mean')
var kefir = require('kefir')
function testCorpus (letters, msg) {
  var inputS = kefir.sequentially(3, letters)
  mean(predict(inputS))
    .debounce(10)
    .log(msg)
}
// test on my own corpus
var corpus = 'fdffdddfffdfdfdffdffdffdffdfdfdffdfffdfdfdfdfdfdfdffdffdfdffdfdffdfdffdfdfdfdfdffdfdfdfdffdfdffdfdfdffdffdffdffdffdfdfdfdfdfdfdffdffdffdffdffdffdffdffdffdffdffdfdfdfdfdffdfdfdfdfdfdfdffdffdfdfdfdfdf'.split('')
testCorpus(corpus, 'human corpus')

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
testCorpus(rands, 'PRNG corpus')
