const express =require ('express');
const router= express.Router();
const category=require('../controllers/categories.ctrl');
const serviceToken = require('../controllers/serviceToken.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.get('/front/categoriES/GET',forceBrute.notBruteSecure,auth.autorizedRole(['*']),category.getMainCategories); //Get Main Category
router.post('/frONT/CAtegorRIES/CREATE',forceBrute.notBruteSecure,auth.autorizedRole(['*']),category.addMainCategories); //add Main caterory
router.get('/Front/SubCATEGORY/GET/:mainCategoryId',forceBrute.notBruteSecure,auth.autorizedRole(['*']),category.getSubCategories);
router.post('/FRont/sUBCAterory/CREATE',forceBrute.notBruteSecure,auth.autorizedRole(['*']),category.addSubCategories) //Crea subcategoria
module.exports=router;