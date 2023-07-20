var express = require('express');
var router = express.Router();
var user_registration = require("../controller/user_registration/registration");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registration',user_registration.registration);
router.post('/otp_verify',user_registration.is_verified);

module.exports = router;
