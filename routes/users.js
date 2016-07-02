var express = require('express');
var router = express.Router();

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

module.exports = router;
