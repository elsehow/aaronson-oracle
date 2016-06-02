var kefir = require('kefir')
var possibleFiveGrams = require('../src/possible-5-grams')()
var mean = require('running-mean');
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


function predict (inputS) {

  var fivegramS = inputS
      .slidingWindow(5,5).map(str => str.join(''))

  var r = mean();

  var onNextLetter = null

  fivegramS
    .map(fivegram => {
      // set to update model on the next input
      var prediction = predictNextLetter(fivegram)
//console.log('predicting', prediction)
      var update = updateModelF(fivegram)
      onNextLetter = letter => {
//console.log('seeing', letter)
        update(letter)
        if (letter === prediction) {
//console.log('i was right!!!')
          return 1
        }
        return 0
      }
    })
    .onValue(() => {})

  return inputS.map(l => {
    if (onNextLetter) {
      return onNextLetter(l)
    }
  })
    .filter(x => x==1||x==0)
    .map(x => {
      r.push(x)
      return r.mean
    })

}

module.exports = predict
