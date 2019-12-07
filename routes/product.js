// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const passport = require('passport');

// const admins =require('../model/admins.model');
// const products =require('../model/products.model');
// const categories =require('../model/categories.model');
// const publishers =require('../model/publishers.model');

// const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// /* GET products page. */
// router.get('/products', function(req, res, next) {
// 	categories.find()
// 	.then(function (category) {
// 		publishers.find()
// 		.then(function (publisher) {
// 			products.find({title: regex}).sort('title')
// 			.then(function (product) {
// 				res.render('products', {categories: category, publish: publisher, items: product, title : 'Danh sách sản phẩm'});
// 			});
// 		});        
// 	});
// });

// /* GET add-product page. */
// router.get('/add-product', function(req, res, next) {
// 	res.render('add-product', {title : 'Thêm sản phẩm mới'});
// });

// /* GET edit-product page. */
// router.get('/edit-product', function(req, res, next) {
// 	res.render('edit-product', {title : 'Chỉnh sửa sản phẩm'});
// });

