var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userList', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

module.exports = router;
