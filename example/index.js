var predict = require('..')
var kefir = require('kefir')
document.addEventListener("DOMContentLoaded", function(event) { 
  var avgEl = document.getElementById('avg')
  
  var pressS = kefir.stream(emitter => {
    document.body.addEventListener("keypress", emitter.emit)
  }).map(ev => ev.key).filter(k => {
    return k==='f'||k==='d'
  })
  
  predict(pressS).onValue(avg => {
    avgEl.innerHTML = avg
  })
})
