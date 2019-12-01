const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const admins =require('../model/admins.model');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
	res.render('index', {title : 'Trang chủ', user: req.user});
});

// /* GET login page. */
router.get('/login', forwardAuthenticated, (req, res) => res.render('login', {title : 'Đăng nhập'}));


// Post login
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

/* GET account page. */
router.get('/accounts', ensureAuthenticated, (req, res) =>{
	admins.find()
	.then(function(admin){
		res.render('accounts', {
			admins: admin,
			user: req.user
		});
	});
});


/* GET sign up page. */
router.get('/sign-up', forwardAuthenticated, (req, res) => res.render('sign-up', {title : 'Đăng ký'}));

// POST sign up.
router.post('/insert', function (req, res, next) {
	const { name, email, password, password1, phone, address, type} = req.body;
	let err=[];
	//check requied fields
	if (!name || !email || ! password || !password1 || !phone || !address||!type) {
		err.push({msg: 'Bạn chưa điền hết thông tin yêu cầu'});
		console.log(err);
	} 
	//check password match
	if (password !== password1) {
		err.push({msg: 'Mật khẩu nhập lại không đúng'});
	}
	//check password length
	if (password.length < 7) {
		err.push({msg: 'Mật khẩu phải trên 6 ký tự'});
	} 
	if (err.length > 0) {
		res.render('sign-up', {
			//save data khi nhập sai
			err,
			name, 
			email,
			phone, 
			address, 
			type
		});
	} else {
		//validation
		//email exists
		admins.findOne({email: email})
		.then(admin => {
			if (admin) {
				err.push({ msg: 'Email đã tồn tại' });
				res.render('sign-up', {
					//save data khi nhập sai
					err,
					name,
					email,
					phone, 
					address, 
					type
				});
			} else {
				const newAdmin = new admins({
					name, 
					email,
					phone, 
					password,
					address, 
					type
				});
				//hash password 
				bcrypt.genSalt(10, (er, salt) => {
					bcrypt.hash(newAdmin.password, salt, (er, hash) => {
						if (er) throw er;
						//set password to hashed
						newAdmin.password = hash;
						//save admin
						newAdmin.save()
						.then(admin => {
							req.flash('success_msg', 'Bạn đã đăng kí thành công hãy đăng nhập');
							res.redirect('/login');
						})
						.catch(er => console.log(er));
					});
				});
			}
		});
	}
});

// Logout
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/login');
});

/* GET forget password page. */
router.get('/forget-password', function(req, res, next) {
	res.render('forget-password', {title : 'Quên mật khẩu'});
});

/* GET products page. */
router.get('/products', function(req, res, next) {
	res.render('products', {title : 'Danh sách sản phẩm'});
});

/* GET add-product page. */
router.get('/add-product', function(req, res, next) {
	res.render('add-product', {title : 'Thêm sản phẩm mới'});
});

/* GET edit-product page. */
router.get('/edit-product', function(req, res, next) {
	res.render('edit-product', {title : 'Chỉnh sửa sản phẩm'});
});

/* GET day page. */
router.get('/day', function(req, res, next) {
	res.render('day', {title : 'Báo cáo theo ngày'});
});

/* GET week page. */
router.get('/week', function(req, res, next) {
	res.render('week', {title : 'Báo cáo theo tuần'});
});

/* GET month page. */
router.get('/month', function(req, res, next) {
	res.render('month', {title : 'Báo cáo theo tháng'});
});

/* GET quarter page. */
router.get('/quarter', function(req, res, next) {
	res.render('quarter', {title : 'Báo cáo theo quý'});
});

/* GET year page. */
router.get('/year', function(req, res, next) {
	res.render('year', {title : 'Báo cáo theo năm'});
});

module.exports = router;
