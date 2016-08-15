var kefir = require('kefir')
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
function updateModelF (fivegram) {
  return function (letter) {
    var fg = model[fivegram]
    if (!fg) {
      model[fivegram] = { f: 0, d: 0 }
    }
    model[fivegram][letter]+=1
    return
  }
}
function predictNextLetter (fivegram) {
  var m = model[fivegram]
  if (!m)
    return 'f'
  if (m.f > m.d)
    return 'f'
  return 'd'
}
function predict (inputS) {
  var lastSix = inputS.slidingWindow(6,6)
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
