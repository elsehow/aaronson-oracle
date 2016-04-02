var swarmlog = require('swarmlog')
var level = require('level-browserify')
var md5 = require('md5')
var EE = require('events').EventEmitter

// manager assigns a dbs to all swarmlogs
// path is the md5 hash of the pubkey
function dbPath (pubkey) {
  return `/tmp/${md5(pubkey)}`
}

// make a swarmlog, with a db path name
// that's set deterministically based on the log's pubkey
function makeSwarmlog (keys, hubs) {
  return swarmlog({
    keys: keys,
    db: level(dbPath(keys.public)),
    sodium: require('chloride'),
    valueEncoding:'json',
    hubs: hubs,
  })
}
module.exports = (db, hubs) => {

  var emitter = new EE()

  function add (keys) {
    // manager should assures no dbs have the same key
    db.get(keys.public, (err, res) => {
      if (res) {
        emitter.emit('error', new Error('Swarmlog not added - a log with the same public key found in manager!'))
      } else {
        var s = makeSwarmlog(keys, hubs)
        // save to db
        db.put(keys.public, s)
        // emit swarmlog when it's added
        emitter.emit('swarmlog', s)
      }
    })
  }

  emitter.add = add
  emitter.get = (key, cb) => {
    db.get(key, cb)
    return
  }

  return emitter
}
