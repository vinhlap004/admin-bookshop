const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const admins =require('../model/admins.model');
const products =require('../model/products.model');
const categories =require('../model/categories.model');
const publishers =require('../model/publishers.model');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

/* GET products page. */
router.get('/products', function(req, res, next) {
	//if (req.user.type === 3) {		
	categories.find().sort('categories')
	.then(function (category) {
		publishers.find().sort('publisher')
		.then(function (publisher) {
			products.find().sort('title')
			.then(function (product) {
				res.render('products', {categories: category, publish: publisher, items: product, title : 'Danh sách sản phẩm'});
			});
		});        
	});
	// } else {
	// 	req.flash('error_msg', 'Bạn không được phép truy cập vào đây!');
	// 		res.redirect('/account');
	// }
});

/* GET add-product page. */
router.get('/add-product', function(req, res, next) {
	res.render('add-product', {title : 'Thêm sản phẩm mới'});
});

/* GET edit-product page. */
router.get('/edit-product', function(req, res, next) {
	res.render('edit-product', {title : 'Chỉnh sửa sản phẩm'});
});

module.exports = router;
