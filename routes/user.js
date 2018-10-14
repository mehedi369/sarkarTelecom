const router = require('express').Router();
const User = require('../models/User');

router.get('/signup', (req, res) => {
  res.render('accounts/signup');
});

router.post('/signup', (req, res, next) => {
  let user = new User();

  // Getting form data
  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  // Checking if user exists
  User.findOne({ email: req.body.email }, (err, existUser) => {
    if (existUser) {
      console.log(req.body.email + "is already exist");
      return res.redirect('/signup');
    } else {
      user.save((err, user) => {
        if (err) return next(err);

        res.json('New user has been created');
      });
    }
  });
});


router.get('/login', (req, res) => {
  res.send("Login page");
});

module.exports = router;
