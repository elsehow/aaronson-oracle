var predict = require('..')
var corpus = 'fdffdddfffdfdfdffdffdffdffdfdfdffdfffdfdfdfdfdfdfdffdffdfdffdfdffdfdffdfdfdfdfdffdfdfdfdffdfdffdfdfdffdffdffdffdffdfdfdfdfdfdfdffdffdffdffdffdffdffdffdffdffdffdfdfdfdfdffdfdfdfdfdfdfdffdffdfdfdfdfdf'.split('')
var mockInputS = require('kefir').sequentially(3, corpus)
predict(mockInputS).log('prediction average')
