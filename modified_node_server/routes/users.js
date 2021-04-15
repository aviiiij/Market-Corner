const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    console.log('request');
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    });
    console.log(newUser);

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);
    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        phone: user.phone,
                        email: user.email
                    }
                })
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

router.post('/trial', (req, res, next) => {
    res.send("trialll");

});

router.post('/deleteye', (req, res) => {
    console.log('delete');
    const id = req.body.id;
    console.log(id);
    console.log(req.body);
    User.deleteOne({ _id: id }, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });


});

router.post('/update', (req, res, next) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const id = req.body.id;
    console.log(name);
    User.findByIdAndUpdate(id, { 'name': name, 'email': email, 'phone': phone }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })


});



// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = router;