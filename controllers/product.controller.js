const products =require('../model/products.model');
const categories =require('../model/categories.model');
const publishers =require('../model/publishers.model');
const admins = require('../model/admins.model');

const passport = require('passport');
const bcrypt = require('bcryptjs');

module.exports.showProduct = (req, res, next) => {
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
}

module.exports.addProduct = (req, res, next) => {
	res.render('add-product', {title : 'Thêm sản phẩm mới'});
}

module.exports.editProduct = (req, res, next) => {
	const[dataProduct,publisher,category]= 
	await Promise.all([products.findById(req.query.id),
		publishers.find().sort('publisher'),
		categories.find().sort('categories')
	]);

	res.render('edit-product', {title : 'Chỉnh sửa sản phẩm', item: dataProduct, publisher: publisher, category: category});
}
