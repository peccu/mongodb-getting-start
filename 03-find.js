var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var findRestaurants = function(db, callback) {
   var cursor = db.collection('restaurants').find(
//        { "borough": "Manhattan" }
//        {"address.zipcode": "10075"}
//        { "grades.grade": "B" }
//        { "grades.score": { $gt: 30 } }
//        { "grades.score": { $lt: 10 } }
//        { "cuisine": "Italian", "address.zipcode": "10075" } // conjunction (AND)
       { $or: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ] } // disjunction (OR)
   ).sort(
       { "borough": 1, "address.zipcode": 1 }
   );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};


MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  findRestaurants(db, function() {
      db.close();
  });
});
