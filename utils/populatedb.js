#! /usr/bin/env node

const fs = require('fs');

console.log('This script populates some test items, iteminstances, inventors and types to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
const Item = require("../models/item");
const ItemInstance = require("../models/iteminstance");
const Inventor = require("../models/inventor");
const Type = require("../models/type");

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var iteminstances = []
var inventors = []
var types = []

function inventorCreate(name, birth, death, country, cb) {
  inventordetail = { name: name }
  if (birth != null) inventordetail.birth = birth;
  if (death != null) inventordetail.death = death;
  if (country != null) inventordetail.country = country;
  
  var inventor = new Inventor(inventordetail);
       
  inventor.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Inventor: ' + inventor);
    inventors.push(inventor)
    cb(null, inventor)
  }  );
}

function typeCreate(name, cb) {
  var type = new Type({ name: name });
       
  type.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Type: ' + type);
    types.push(type)
    cb(null, type);
  }   );
}

function itemCreate(name, description, value, inventor, type, craftingMaterials, image, cb) {
  itemdetail = { 
    name: name,
    description: description,
    value: value,
    inventor: inventor,
    type: type,
    image: image
  }
  if (craftingMaterials != null) itemdetail.craftingMaterials = craftingMaterials;
    
  var item = new Item(itemdetail);    
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  }  );
}


function itemInstanceCreate(item, acquired, crafted, cb) {
  iteminstancedetail = { 
    item: item,
    acquired: acquired,
    crafted: crafted
  }    
    
  var iteminstance = new ItemInstance(iteminstancedetail);    
  iteminstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING ItemInstance: ' + iteminstance);
      cb(err, null)
      return
    }
    console.log('New ItemInstance: ' + iteminstance);
    iteminstances.push(iteminstance)
    cb(null, item)
  }  );
}


function createInventors(cb) {
    async.series([
        function(callback) {
          inventorCreate('Patrick Stevens', '1973-06-09', null, "America", callback);
        },
        function(callback) {
          inventorCreate('Sam Johnson', '1922-06-09', '1969-02-03', "Sierra Leone", callback);
        },
        function(callback) {
          inventorCreate('Aleksandr Vasuitin', null, '2000-05-22', null, callback);
        },
        function(callback) {
          inventorCreate('Stefan Johansson', '1955-08-10', null, "Sweden", callback);
        },
        function(callback) {
          inventorCreate('Yoko Mundongo', '1919-03-09', null, "Indonesia", callback);
        },
        ],
        // optional callback
        cb);
}

function createTypes(cb) {
  async.series([
    function(callback) {
      typeCreate("Armour", callback);
    },
    function(callback) {
      typeCreate("Weapon", callback);
    },
    function(callback) {
      typeCreate("Wood", callback);
    },
    function(callback) {
      typeCreate("Gardening", callback);
    },
    function(callback) {
      typeCreate("Tool", callback);
    },
    function(callback) {
      typeCreate("Stone", callback);
    },
    function(callback) {
      typeCreate("Clothing", callback);
    },
  ],
  cb)
}


function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate("Hoe", "Cultivate soil and remove weeds", 4, inventors[rndm(inventors.length)], [types[rndm(types.length)]], null, fs.readFileSync("../public/images/diamond-hoe.webp"), callback);
        },
        function(callback) {
          itemCreate("Dagger", "Cuts.. something", 7, inventors[rndm(inventors.length)], [types[rndm(types.length)]], null, fs.readFileSync("../public/images/diamond-hoe.webp"), callback);
        },
        function(callback) {
          itemCreate("Helmet", "Protects the brain", 12, inventors[rndm(inventors.length)], [types[rndm(types.length)]], null, fs.readFileSync("../public/images/diamond_helmet.png"), callback);
        },
        function(callback) {
          itemCreate("Fork", "Eat with style", 2, inventors[rndm(inventors.length)], [types[rndm(types.length)]], null, fs.readFileSync("../public/images/diamond-hoe.webp"), callback);
        },
        function(callback) {
          itemCreate("Hammer", "Maybe for nails, maybe for something else", 5, inventors[rndm(inventors.length)], [types[rndm(types.length)]], null, fs.readFileSync("../public/images/diamond-hoe.webp"), callback);
        },
        function(callback) {
          itemCreate("Sledgehammer", "Hulk smash", 14, inventors[rndm(inventors.length)], [types[rndm(types.length)]], null, fs.readFileSync("../public/images/diamond-hoe.webp"), callback);
        },
        function(callback) {
          itemCreate("Limestone", "Annoying stone", 1, inventors[rndm(inventors.length)], [types[rndm(types.length)]], null, fs.readFileSync("../public/images/diamond-hoe.webp"), callback);
        },
        function(callback) {
          itemCreate("Oak Wood", "For a table?", 2, inventors[rndm(inventors.length)], [types[rndm(types.length)]], null, fs.readFileSync("../public/images/diamond-hoe.webp"), callback);
        },
        ],
        // optional callback
        cb);
}


function createItemInstances(cb) {
    async.parallel([
        function(callback) {
          itemInstanceCreate(items[rndm(items.length)], undefined, true, callback)
        },
        function(callback) {
          itemInstanceCreate(items[rndm(items.length)], undefined, false, callback)
        },
        function(callback) {
          itemInstanceCreate(items[rndm(items.length)], undefined, false, callback)
        },
        function(callback) {
          itemInstanceCreate(items[rndm(items.length)], "2016-04-05", false, callback)
        },
        function(callback) {
          itemInstanceCreate(items[rndm(items.length)], undefined, false, callback)
        },
        function(callback) {
          itemInstanceCreate(items[rndm(items.length)], undefined, true, callback)
        },
        function(callback) {
          itemInstanceCreate(items[rndm(items.length)], "2012-02-08", false, callback)
        },
        function(callback) {
          itemInstanceCreate(items[rndm(items.length)], undefined, true, callback)
        },
        function(callback) {
          itemInstanceCreate(items[rndm(items.length)], "2021-10-02", false, callback)
        },
        function(callback) {
          itemInstanceCreate(items[rndm(items.length)], undefined, true, callback)
        },
        ],
        // Optional callback
        cb);
}



async.series([
    createInventors,
    createTypes,
    createItems,
    createItemInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+ iteminstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});


// Helper function

function rndm(max) {
  return Math.floor(Math.random() * max);
}