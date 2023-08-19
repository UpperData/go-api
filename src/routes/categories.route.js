const express =require ('express');
const router= express.Router();
const category=require('../controllers/categories.ctrl');
const serviceToken = require('../controllers/serviceToken.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.get('/front/categoriES/GET',forceBrute.notBruteSecure,category.getMainCategories); 
router.post('/frONT/CAtegorRIES/CREATE',forceBrute.notBruteSecure,category.addMainCategories);

module.exports=router;