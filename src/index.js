var kefir = require('kefir')
var possibleFiveGrams = require('../src/possible-5-grams')()
var _ = require('lodash')
/*

  set up a model of the form

    [
    'ffffg': { f: 0 , d: 2 },
     ...
    ]

  for each 5-gram

  */
var model = {}
possibleFiveGrams.map(fg => model[fg] = { f: 0, d: 0})


function updateModelF (fivegram) {
  return function (letter) {
    model[fivegram][letter]+=1
  }
}

function getProbability (target, complement) {
  var total = target + complement
  // never divide by zero
  if (total === 0)
    return 1 / 2
  return target / total
}

function predictNextLetter (fivegram) {
  var m = model[fivegram]
  var p = getProbability(m.f, m.d)
  if (p > Math.random())
    return 'f'
  return 'd'
}

function predict (inputS) {

  var lastSix = inputS
      .slidingWindow(6,6)

  return lastSix.map(s => {
    var fiveGram = _.slice(s, 0,5).join('')
    // predict next value
    var prediction = predictNextLetter(fiveGram)
    //make a fn to update model after i see real value
    var updateModel = updateModelF(fiveGram)
    // get the next letter now
    var last = _.last(s)
    // update my model with it (HACK SIDE-EFFECTY)
    updateModel(last)
    return [prediction, last]
  })

}

module.exports = predict
