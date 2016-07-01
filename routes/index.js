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

router.get('/signin', function(req, res, next) {
  res.render('signin')
})

router.post('/signin', function(req, res, next) {

  var email = req.body.emailInput;
  var password = req.body.passwordInput;

  console.log(email,password)

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

module.exports = router;
