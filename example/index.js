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

  var accuracyS = predict(pressS)
  var countS = accuracyS.scan(acc => acc+=1, 0)

  accuracyS.zip(countS).filter(z => z[1]>15).onValue(z => 
      avgEl.innerHTML = z[0]
  )
})
