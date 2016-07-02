var express = require('express');
var router = express.Router();

router.get('/newStore', function(req, res, next) {
  res.render('newStore');
})

router.get('/locations', function(req, res, next) {
  knex.select('*')
  .from('locations')
  .then(function(data){
    console.log(data);
    var locations = [];
    for (var i = 0; i < data.length; i++) {
      var location = {
        state: data[i].state,
        city: data[i].city,
        zip: data[i].zip,
        address: data[i].address
      }
      locations.push(location);
    }
    console.log(data);
    res.render('locations', { title: 'Locations', locationData: locations });
  })
  .catch(function(err){
    console.log(err)
  })
  // res.render('locations')
})

router.post('/newStore', function(req, res, next) {
  var state = req.body.stateInput;
  var city = req.body.cityInput;
  var zip = req.body.zipInput;
  var address = req.body.addressInput;

  console.log(address + " " + city + ", " + state + ", " + zip)

  knex('locations')
  .insert({
    state: state,
    city: city,
    zip: zip,
    address: address

  })
  .catch(function(err) {
    console.log(err);
  })

  knex.select('*')
  .from('locations')
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });

  res.render('index');
})

module.exports = router;
