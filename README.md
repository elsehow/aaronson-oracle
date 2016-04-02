# swarmlog-manager

manage your swarmlogs!

## install

```
npm install swarmlog-manager
```

## use

```javascript
var hubs = [ 'https://signalhub.mafintosh.com' ]
var db = level('./manager-db')
var manager = require('swarmlog-manager')(db, hubs)
// an event triggered when a new key is added
manager.on('swarmlog', s => {
  console.log('new swarmlog!')
  // we can also look up this log by corresponding pubkey
  manager.get(keys.public, (err, res) => {
   console.log(res === s)
  })
})
// import some ssb keys
var keys = require('./keys.json')
// add them to the manager
manager.add(keys)

// > new swarmlog!
// > true
```

## api

### var manager = require('swarmlog-manager')(leveldb, signalhubs)

create a new swarmlog manager, using the given signalhubs and leveldb instance

### manager.add(ssbkeys)

add a swarmlog, by its ssb keys

### manager.logs

an object of `{ ssbPublicKey: swarmlog, ... }`

### manager.on('swarmlog', cb)

`cb(swarmlog)` is called whenever a new swarmlog is added (i.e. after `manager.add`)

### manager.on('error, cb)

`cb(err)` is called whenever there's some error


## license

BSD
