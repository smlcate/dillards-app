require('dotenv').config();

var express = require('express');
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
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

var sessionData = {
  user: {
    email: null,
    lid: null,
    did: null
  }
};


/* GET home page. */
router.get('/', function(req, res, next) {
  if(sessionData.user.email === null) {
    res.render('signin', { title: 'Sign-in' })
  } else {
    console.log(sessionData);
    res.render('index', { title: 'Home', sessionData: sessionData });
  }
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
  var state = req.body.locationInput;
  var lid = null;
  // var city = req.body.cityInput;
  // var zip = req.body.zipInput;

  console.log(email,password)

  knex.select('*')
  .from('locations')
  .where({ state: state })
  .then(function(data) {
    console.log(data)
    res
  })

  knex('users')
  .insert({
    email: email,
    password: password
  })

  .catch(function(err) {
    console.log(err);
  })

  knex.select('*')
  .from('locations')
  .where({ state: state })
  .then(function(data) {
    if(data){
      knex('users')
      .insert({
        lid: data.id
      })
      .catch(function(err){
        console.log(err)
      })
    }
  })

  // knex.select('*')
  // .from('users')
  // .then(function(data) {
  //   console.log(data);
  // })
  // .catch(function(err) {
  //   console.log(err);
  // })



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

  var img = req.body.imgInput;

  var lid = req.body.lidInput;
  var did = req.body.didInput;

  knex('employees')
  .insert({
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
    img: img,
    lid: lid,
    did: did
  })
  .catch(function(err) {
    console.log(err);
  })

  knex('departments')
  .insert({
    department: did
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

  // var routes = ['home', 'Sign-in']

  knex('users')
  .where({ email: email })
  .first()
  .then(function(data) {
    console.log(data);
    if(bcrypt.compareSync(password, data.password, 10)) {
      console.log("Match")
      sessionData.user = data;
      console.log(process.env.ADMIN_)
      if (data.email === process.env.ADMIN_) {
        sessionData.user.admin = true;

        console.log('admin');
      }
      console.log(sessionData);

      if(sessionData.user.admin === true){
        // document.getElementsByClass('marioPunchBowl').styles('display:block')
      }

      res.render('index', { sessionData: sessionData });
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
        state: data[i].state
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
        img: data[i].img,
        lid: data[i].lid,
        did: data[i].did
      }
      users.push(user);
    }
    console.log(users);
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

  sessionData.user.lid = id

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

router.post('/comment', function(req, res, next) {
  var comment = req.body.newComment;

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

router.get('/comments/:lid.did', function(req, res, next) {

})

router.get('/store/:lid', function(req, res, next) {
  sessionData.user.lid = req.params.lid.slice(1);
  console.log(sessionData);

  var storeData = {

  };

  var departments = [];


  knex.select('*')
  .from('departments')
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      console.log(data[i])
      departments.push(data[i].department);
      console.log(departments);
    }

  })
  .catch(function(err) {
    console.log(err);
  })
  knex.select('*')
  .from('locations')
  .where({ id: sessionData.user.lid })
  .then(function(data) {
    console.log(data[0]);
    storeData = data[0];
    console.log(departments);
    res.render('storeHomePage', { storeData: storeData, departments: departments })
  })
  .catch(function(err) {
    console.log(err);
  })

})

router.get('/store/:id/department/:did', function(req, res, next) {

  res.render('storeHomePage');

})


module.exports = router;
