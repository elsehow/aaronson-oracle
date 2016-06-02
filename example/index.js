var predict = require('..')
var kefir = require('kefir')
document.addEventListener("DOMContentLoaded", function(event) {
  var avgEl = document.getElementById('avg')
  var resultTable = document.getElementsByTagName('tbody')[0]
  var result_counter = 0;

  var pressS = kefir.stream(emitter => {
    document.body.addEventListener("keypress", emitter.emit)
  }).map(e => {
    if(window.event) { // IE
      return e.keyCode;
    } else if(e.which){ // Netscape/Firefox/Opera
      return e.which;
    }
  }).map(String.fromCharCode)
  .filter(l => {
   return (l==='f'||l==='d')
  })

  var clamp = (toClamp, digits) => {
    return Math.round(toClamp * Math.pow(10, digits)) / Math.pow(10, digits);
  }

  var insertResultRow = (input, guess, isCorrect, oldAverage, newAverage) => {
    result_counter++;

    var rowEl = document.createElement("tr")
    rowEl.className = 'result_row ' + (isCorrect ? 'correct' : 'incorrect')
    rowEl.id = "result_" + result_counter;

    var inputEl = document.createElement("td")
    inputEl.className = 'result_row_item result_input'
    inputEl.insertBefore(document.createTextNode(input), null)

    var guessEl = document.createElement("td")
    guessEl.className = 'result_row_item result_guess'
    guessEl.insertBefore(document.createTextNode(guess), null)

    var attemptNumberEl = document.createElement("td")
    attemptNumberEl.className = 'result_row_item result_attempt_number'
    attemptNumberEl.insertBefore(document.createTextNode(result_counter), null)

    var averageDiffEl = document.createElement("td")
    averageDiffEl.className = 'result_row_item result_avg_diff'
    averageDiffEl.insertBefore(document.createTextNode(clamp(newAverage - oldAverage, 4)), null)

    var averageEl = document.createElement("td")
    averageEl.className = 'result_row_item result_avg'
    averageEl.insertBefore(document.createTextNode(clamp(newAverage, 4)), null)

    rowEl.insertBefore(attemptNumberEl, null)
    rowEl.insertBefore(inputEl, null)
    rowEl.insertBefore(guessEl, null)
    rowEl.insertBefore(averageDiffEl, null)
    rowEl.insertBefore(averageEl, null)
    resultTable.insertBefore(rowEl, document.getElementById('result_' + (result_counter - 1)))
  }

  var accuracyS = predict(pressS, insertResultRow);
  var countS = accuracyS.scan(acc => acc+=1, 0)

  accuracyS.zip(countS).filter(z => z[1]>15).onValue(z =>
      avgEl.innerHTML = z[0]
  )
})
