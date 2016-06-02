var mean = require('running-mean')
// takes a stream of [prediction, letter]
// outputs a rolling mean of accuracy

function isCorrect (prediction, letter) {
  if (prediction === letter)
    return 1
  return 0
}

module.exports = (stream) => {

  var r = mean();

  return stream
    .map(r => isCorrect(r[0], r[1]))
    .map(p => {
      r.push(p)
      return r.mean
    })
}
