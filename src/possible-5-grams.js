var _ = require('lodash'),
    permutations = require('permutation')

// generates all 32 possible 5-grams of vocabulary 'f' 'd'
module.exports = () => {
  var r = _.range(1,7).map(i => {
    var fs = Array(i).join('f')
    var ds = Array(7-i).join('d')
    return fs+ds
  }).map(ls => permutations(ls, {unique:true}))

  return _.flatten(r)
}
