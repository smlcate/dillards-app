var express = require('express');
var bcrypt = require('bcrypt');
var knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '127.0.0.1',
    user     : 'SamCate',
    password : 'samandRoss6',
    database : 'dillardsapp'
  },
  useNullAsDefault: true
});
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

//Get user Sign user up
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {

  var email = req.body.emailInput;
  var password = bcrypt.hashSync(req.body.passwordInput, 10);

  console.log(email,password)

  knex('users')
  .insert({
    email: email,
    password: password
  })
  .catch(function(err) {
    console.log(err);
  })

  knex.select('*')
  .from('users')
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  })



  res.render('index');
});

router.get('/empSignup', function(req, res, next) {
  res.render('empSignup');
});

router.post('/empSignup', function(req, res, next) {
  var email = req.body.emailInput;
  var password = bcrypt.hashSync(req.body.passwordInput, 10);
  var firstname = req.body.fNameInput;
  var lastname = req.body.lNameInput;
  var lid = req.body.lidInput;
  var did = req.body.didInput;

  knex('employees')
  .insert({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
    lid: lid,
    did: did
  })
  .catch(function(err) {
    console.log(err);
  })

  knex.select('*')
  .from('employees')
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    console.log(err);
  });

  res.render('index');
});

router.get('/signin', function(req, res, next) {
  res.render('signin')
})

router.post('/signin', function(req, res, next) {

  var email = req.body.emailInput;
  var password = req.body.passwordInput;

  knex('users')
  .where({ email: email })
  .first()
  .then(function(data) {
    console.log(data);
    if(bcrypt.compareSync(password, data.password, 10)) {
      console.log("Match")

      res.render('index');
    } else {
      console.log('No match');
      //TODO: show user if inputs are wrong
      res.render('signin', { error: 'Problem Signing in' })
    }
  })
  .catch(function(err) {
    console.log(err);
  })
});

router.get('/userList', function(req,res,next) {
  knex.select('*')
  .from('users')
  .then(function(data){
    console.log(data);
    var users = [];
    for (var i = 0; i < data.length; i++) {
      var user = {
        email: data[i].email,
      }
      users.push(user);
    }
    console.log(data);
    res.render('userList', { title: 'Users', userData: users });
  })
  .catch(function(err){
    console.log(err)
  })
  // res.render('userList');
});

router.get('/employeeList', function(req,res,next) {
  knex.select('*')
  .from('employees')
  .then(function(data){
    console.log(data);
    var users = [];
    for (var i = 0; i < data.length; i++) {
      var user = {
        email: data[i].email,
        firstname: data[i].firstname,
        lastname: data[i].lastname,
        lid: data[i].lid,
        did: data[i].did
      }
      users.push(user);
    }
    console.log(data);
    res.render('userList', { title: 'Employees', userData: users });
  })
  .catch(function(err){
    console.log(err)
  })
  // res.render('userList');
});

router.get('/newStore', function(req, res, next) {
  res.render('newStore');
})

router.get('/locations', function(req, res, next) {
  knex.select('*')
  .from('locations')
  .then(function(data){
    console.log(data);
    var locations = [];
    var comment_length = 0;
    for (var i = 0; i < data.length; i++) {
      var location = {
        id: data[i].id,
        state: data[i].state,
        city: data[i].city,
        zip: data[i].zip,
        address: data[i].address
      }
      locations.push(location);
    }
    console.log(data);
    res.render('locations', { title: 'Locations', locationData: locations, commentLength: comment_length });
  })
  .catch(function(err){
    console.log(err)
  })
  // res.render('locations')
})

router.post('/comments', function(req, res, next) {
  var id = req.body.id;
  var comments = [];

  knex('comments')
  .select('*')
  .where({ lid: id })
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      var comment = {
        commentText: data[i].comment,
        postDate: data[i].post_date
      }
      comments.push(comment);
    }

  })
  res.render('comments', { title: 'Comments', commentData: comments });
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
