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


const products =require('../model/products.model');
const categories =require('../model/categories.model');
const publishers =require('../model/publishers.model');


/* GET products page. */
router.get('/products', function(req, res, next) {
	categories.find()
	.then(function (category) {
		publishers.find()
		.then(function (publisher) {
			products.find().sort('title')
			.then(function (product) {
				res.render('products', {categories: category, publish: publisher, items: product, title : 'Danh sách sản phẩm'});
			});
		});        
	});
});

/* GET add-product page. */
router.get('/add-product', function(req, res, next) {
	res.render('add-product', {title : 'Thêm sản phẩm mới'});
});

/* GET edit-product page. */
router.get('/edit-product', function(req, res, next) {
	res.render('edit-product', {title : 'Chỉnh sửa sản phẩm'});
});


// /* GET products page. */
// router.get('/products', function(req, res, next) {
// 	res.render('products', {title : 'Danh sách sản phẩm'});
// });

// /* GET add-product page. */
// router.get('/add-product', function(req, res, next) {
// 	res.render('add-product', {title : 'Thêm sản phẩm mới'});
// });

// /* GET edit-product page. */
// router.get('/edit-product', function(req, res, next) {
// 	res.render('edit-product', {title : 'Chỉnh sửa sản phẩm'});
// });





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
