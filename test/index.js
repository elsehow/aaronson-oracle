var test = require('tape')
var level = require('level-browserify')

var hubs = [ 'https://signalhub.mafintosh.com' ]
var db = level(`./${new Date()}`)
var manager = require('..')(db, hubs)


var keys1 = require('./keys1.json')
var log1 = null
test('can add a swarmlog', t => {
  t.plan(3)
  manager.on('swarmlog', s => {
    t.ok(s)
    // should be able to look up this log by corresponding pubkey
    manager.get(keys1.public, (err, res) => {
      t.notOk(err)
      t.ok(res)
      log1 = res
    })
  })
  manager.on('error', err => {
    t.notOk(err)
  })
  // some keys with read/write
  manager.add(keys1)
})

test('can add another swarmlog', t => {
  t.plan(3)
  manager.removeAllListeners()
  manager.on('swarmlog', s => {
    t.ok(s)
    manager.get(keys2.public, (err, res) => {
      t.notOk(err)
      t.ok(res)
    })
  })
  manager.on('error', err => {
    t.notOk(err)
  })
  var keys2 = {
    public: require('./keys2.json').public
  }
  manager.add(keys2)
})

test('wont add swarmlog wtih the same pubkey as one that exists', t => {
  t.plan(2)
  manager.removeAllListeners()
  var keys3 = {
    public: require('./keys1.json').public
  }
  manager.on('swarmlog', s => {
    t.notOk(s)
  })
  manager.on('error', err => {
    t.ok(err, err)
  })
  manager.add(keys3)
  manager.get(keys3.public, (err, res) => {
    t.deepEqual(res, log1)
  })
})

test('logs should persist!', t => {
  var manager2 = require('..')(db, hubs)
  manager2.get(keys1.public, (err, res) => {
    t.deepEqual(res, log1)
  })
})
