var express = require('express');
var router = express.Router();

router.get('/empSignup', function(req, res, next) {
  res.render('empSignup');
});

router.post('/empSignup', function(req, res, next) {
  var email = req.body.emailInput;
  var password = bcrypt.hashSync(req.body.passwordInput, 10);
  var firstname = req.body.fNameInput;
  var lastname = req.body.lNameInput;
  var lid = req.body.lidInput;
  var did = req.body.didInput
  // var departments = ['--Accessories--', 'Watches', 'Handbags', 'Jewelry', '--Cosmetics--', 'Elizabeth Arden', 'Clinique', 'Este Lauder', 'Lancôme', 'Fragrance', '--Mens--', 'Suits', 'Mens Shoes', 'Urbanwear', 'Big and Tall', '--Womens--', 'Dresses', 'Ready Wear', 'Womens Shoes', '--Home--', 'Bedding', 'China', '--Kids--', 'Boys', 'Girls', 'Infant']

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

module.exports = router;
