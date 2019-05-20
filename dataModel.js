/**
 * data processing model
 * asynchronous operation file 'db.json'
 */
var fs = require('fs')
var dbPath = './db.json'

// get data
exports.find = function (callback) {
  fs.readFile(dbPath, function (err, data){
    if (err){
      return callback(err)
    }
    callback(null, JSON.parse(data).dbData)
  })
}

// add data
exports.save = function (dbData, callback) {
  fs.readFile(dbPath, function (err, data){
    if (err){
      return callback(err)
    }
    data = JSON.parse(data).dbData;
    dbData.id = data.length ? data[data.length - 1].id + 1 : 1;
    data.push(dbData);
    data = {dbData:data};
    fs.writeFile(dbPath, JSON.stringify(data), function (err){
      if (err){
        return callback(err)
      }
       callback(null)
    })
  })
}

//find data
exports.findByID = function (id, callback){
  fs.readFile(dbPath, function (err, data){
    if (err){
      return callback(err)
    }
    var data = JSON.parse(data).dbData;
    var rel = data.find(function(v){
      return v.id == id
    })
    callback(null, rel)
  })
}

// update data
exports.updateByID = function (dbData, callback) {
  fs.readFile(dbPath, function (err, data){
    if (err){
      return callback(err)
    }
    data = JSON.parse(data).dbData;
    var rel = data.find(function(v){
      return v.id == dbData.id
    });
    for(var key in dbData){
      rel[key] = dbData[key]
    }
    data = {dbData:data};
    fs.writeFile(dbPath, JSON.stringify(data), function (err){
      if (err){
        return callback(err)
      }
       callback(null)
    })
  })
}

//delete data
exports.delete = function (id, callback) {
  fs.readFile(dbPath, function(err, data){
    if(err) {
      return callback(err)
    }
    data = JSON.parse(data).dbData;
    data.splice(data.findIndex(function(v){
      return v.id == id
    }),1)
    data = {dbData:data};
    fs.writeFile(dbPath, JSON.stringify(data), function (err){
      if (err){
        return callback(err)
      }
       callback(null)
    })
  })
}