const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const admins =require('../model/admins.model');
const products =require('../model/products.model');
const categories =require('../model/categories.model');
const publishers =require('../model/publishers.model');

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const controllerProduct =require('../controllers/product.controller');

/* GET products page. */
//router.get('/products', ensureAuthenticated, controllerProduct.showProduct);
router.get('/products', controllerProduct.showProduct);

/* GET add-product page. */
router.get('/add-product', controllerProduct.addProduct);

/* GET edit-product page. */
router.get('/edit-product', controllerProduct.editProduct);


/* GET product delete page. */
router.get('/product-delete', function (req, res, next) {
	products.findByIdAndRemove(req.query.id, (err) => {
		res.redirect('/products');
	});
});

module.exports = router;
