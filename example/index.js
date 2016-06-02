var predict = require('..')
var kefir = require('kefir')
document.addEventListener("DOMContentLoaded", function(event) { 
  var avgEl = document.getElementById('avg')
  
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

  predict(pressS).onValue(avg => {
    avgEl.innerHTML = avg
  })
})
