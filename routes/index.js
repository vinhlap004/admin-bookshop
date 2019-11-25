var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET account page. */
router.get('/accounts', function(req, res, next) {
  res.render('accounts');
});

/* GET products page. */
router.get('/products', function(req, res, next) {
  res.render('products');
});

/* GET add-product page. */
router.get('/add-product', function(req, res, next) {
  res.render('add-product');
});

/* GET edit-product page. */
router.get('/edit-product', function(req, res, next) {
  res.render('edit-product');
});

/* GET day page. */
router.get('/day', function(req, res, next) {
  res.render('day');
});

/* GET week page. */
router.get('/week', function(req, res, next) {
  res.render('week');
});

/* GET month page. */
router.get('/month', function(req, res, next) {
  res.render('month');
});

/* GET quarter page. */
router.get('/quarter', function(req, res, next) {
  res.render('quarter');
});

/* GET year page. */
router.get('/year', function(req, res, next) {
  res.render('year');
});

module.exports = router;
