var predict = require('..')
var kefir = require('kefir')
var mean = require('../src/running-mean')

function round (num) {
  return Math.floor(num * 100)
}

function whichKey (e) {
  if (window.event) // IE
    return e.keyCode
  return e.which
}

document.addEventListener("DOMContentLoaded", () => {

  var sufficientCorpusForAccuracy = 20
  var avgEl = document.getElementById('avg')
  var lastGuessesEl = document.getElementById('lastGuesses')
  var pressS = kefir.stream(emitter => {
    document.body.addEventListener("keypress", emitter.emit)
  }).map(whichKey)
    .map(String.fromCharCode)
    .filter(l => (l==='f'||l==='d'))

  var predictionS = predict(pressS)
  var countS = predictionS.scan(acc => acc+=1, 0)
  var sufficientCorpusS = countS.filter(z => z>sufficientCorpusForAccuracy)
  var goodPredictionS = predictionS.sampledBy(sufficientCorpusS)
  var accuracyS = mean(goodPredictionS)

  accuracyS.onValue(z =>  {
    avgEl.innerHTML = round(z) + '%'
    return
  })

  predictionS.slidingWindow(20).onValue(ps => {
    var guesses = ps.map(p => {
      var correct = p[0]===p[1]
      var color = correct ? "white" : "red"
      return `<span style="background-color:${color}">predicted: ${p[0]}, observed: ${p[1]}</span><br>`
    }).reverse().join('')
    lastGuessesEl.innerHTML = guesses
  })


})
