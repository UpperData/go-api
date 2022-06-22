const express =require ('express');
const router= express.Router();
const changeType=require('../controllers/cha');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');

router.post('/change/Type/add',forceBrute.notBruteSecure,auth.autorizedRole(['5']), changeType.createChangeType); // Regsitra tipo de cambio


module.exports=router;