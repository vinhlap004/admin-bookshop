const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const admins =require('../model/admins.model');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const controllerUser =require('../controllers/admin.controller');

// /* GET login page. */
router.get('/login', forwardAuthenticated, controllerUser.getLogin);


// POST login
router.post('/login', controllerUser.postLogin);

/* GET account page. */
router.get('/account', ensureAuthenticated, controllerUser.account);

/* GET employees page. */
router.get('/employees', ensureAuthenticated, controllerUser.employees);


/* GET sign up page. */
router.get('/sign-up', ensureAuthenticated, controllerUser.signup);

// POST sign up.
router.post('/insert', controllerUser.insert);

// POST update.
router.post('/update', controllerUser.update);

// Logout
router.get('/logout', controllerUser.logout);

/* GET forget password page. */
router.get('/forget-password', controllerUser.forgetPassword);

/* GET User page. */
router.get('/show-user', function (req, res, next) {

	admins.findById(req.query.id, function (err, userData) {
		console.log(userData);
		if (err) {
			console.log("Can't show data\n");
			res.sendStatus(500);
		} else {
			res.render('show-user', {title : 'Thông tin nhân viên', data: userData});
		}
	})
});

/* GET delete page. */
router.get('/delete', function (req, res, next) {
	admins.findByIdAndRemove(req.query.id, (err) => {
		res.redirect('/employees');
	});
});

module.exports = router;
