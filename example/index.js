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

  var avgEl = document.getElementById('avg')
  var lastGuessesEl = document.getElementById('lastGuesses')
  var keyPressS = kefir.stream(emitter => {
    document.body.addEventListener("keypress", emitter.emit)
  }).map(whichKey)
    .map(String.fromCharCode)
    .filter(l => (l==='f'||l==='d'))

  var buttonsE = document.querySelectorAll('.button');
  var buttonsA = [buttonsE[0], buttonsE[1]];

  var touchPressS = kefir.merge(
    buttonsA.map(e => kefir.fromEvents(e, 'click'))
  ).map(e => e.target.getAttribute('data-key'))

  var pressS = kefir.merge([keyPressS, touchPressS]);

  var predictionS = predict(pressS)
  var accuracyS = mean(predictionS)
  var countS = accuracyS.scan(acc => acc+=1, 0)

  accuracyS.zip(countS).filter(z => z[1]>15).onValue(z =>  {
    avgEl.innerHTML = round(z[0]) + '%'
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
