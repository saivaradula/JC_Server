const express = require('express');
const router = express.Router();

// Authenticate
const auth_controller = require('../controllers/authenticate');
const users_controller = require('../controllers/users');
const customers_controller = require('../controllers/customers');
const seasons_controller = require('../controllers/seasons');
const collections_controller = require('../controllers/collection');
const moulds_controller = require('../controllers/mould');
const component_controller = require('../controllers/component');
const product_controller = require('../controllers/products');

// auth and register
router.post('/auth/login', auth_controller.loginUser);

// users
router.post('/user/update', users_controller.updateUser);
router.post('/user/add', users_controller.addUser);
router.get('/users/list', users_controller.userList);

// addings apis
router.post('/customers/:id/seasons/add', seasons_controller.addNewSeason);
router.post('/customers/:id/collections/add', collections_controller.addNewCollection);
router.post('/customers/:id/moulds/add', moulds_controller.addNewMould);
router.post('/customers/:id/components/add', component_controller.addNewComponent);

// product 
router.post('/customers/:id/products/add', product_controller.addProducts);

// customers
router.post('/customer/add', customers_controller.addCustomer);

router.get('/customers/list', customers_controller.getCustomers);
router.get('/customers/:id/brands', customers_controller.getCustomerBrands);
router.get('/customers/:id/seasons', customers_controller.getCustomerSeason);
router.get('/customers/:id/collections', customers_controller.getCustomerCollection);
router.get('/customers/:id/moulds/:bid/:sid/:cid', customers_controller.getCustomerMoulds);
router.get('/customers/:id/components/:bid/:sid/:cid', customers_controller.getCustomerComponents);
router.get('/customers/:id/products/:bid/:sid/:cid/:mid/:ccid', customers_controller.getCustomerProducts);

module.exports = router;