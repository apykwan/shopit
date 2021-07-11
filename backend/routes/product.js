const express = require('express');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { 
    getProducts, 
    getSingleProduct, 
    newProduct,
    updateProduct,
    deleteProduct,
    getAdminProducts,
    createProductReview,
    getProductReviews,
    deleteReview, 
    productBrief
} = require('../controllers/productController');

const router = express.Router();

router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/products/brief').get(productBrief);

router.use(isAuthenticatedUser);
router.route('/admin/product/new').post(authorizeRoles('admin'), newProduct);

router.route('/admin/product/:id')
    .put(authorizeRoles('admin'), updateProduct)
    .delete(authorizeRoles('admin'), deleteProduct);

router.route('/review').put(createProductReview);
router.route('/reviews')
    .get(getProductReviews)
    .delete(deleteReview);

module.exports = router;