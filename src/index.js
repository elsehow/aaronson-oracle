var kefir = require('kefir')
var possibleFiveGrams = require('../src/possible-5-grams')()
var mean = require('running-mean');
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

function predictNextLetter (fivegram) {
  var m = model[fivegram]
  if (m.f > m.d)
    return 'f'
  return 'd'
}

function isCorrect (prediction, letter) {
  if (prediction === letter)
    return 1
  return 0
}

function predict (inputS, callback) {

  var r = mean();

  var lastSix = inputS
      .slidingWindow(6,6)

  var last, prediction, amCorrect;

  return lastSix.map(s => {
   var fiveGram = _.slice(s, 0,5).join('')
   // predict next value
   prediction = predictNextLetter(fiveGram)
   //make a fn to update model after i see real value
   var updateModel = updateModelF(fiveGram)
   // get the next letter now
   last = _.last(s)
   // update my model with it (HACK SIDE-EFFECTY)
   updateModel(last)
   // return whether my prediction was correct
   amCorrect = isCorrect(prediction, last)
   return amCorrect
  })
  .map(p => {
    var beforeAverage = r.mean;
    r.push(p)
    // call callback with latest results (SUCH SIDE-EFFECTY)
    if (callback) { callback(last, prediction, !!amCorrect, beforeAverage, r.mean) }
    return r.mean
  })
}

module.exports = predict;
