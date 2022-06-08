const express =require ('express');
const router= express.Router();
const voucher=require('../controllers/voucher.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.post('/vouchEr/NeW/',forceBrute.notBruteSecure,auth.autorizedRole([5]),voucher.voucherCreate);// asigna o revoca membresia
//router.get('/memBeRship/Get/Byemail/:email',forceBrute.notBruteSecure,auth.autorizedRole([5]),membership.getRoleByEmail);// obtiene membresia por email

module.exports=router;