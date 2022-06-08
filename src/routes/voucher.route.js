const express =require ('express');
const router= express.Router();
const voucher=require('../controllers/voucher.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.post('/vouchEr/NeW/',forceBrute.notBruteSecure,auth.autorizedRole([5]),voucher.voucherCreate);// nuevo voucher
router.get('/VouCHER/GEt/:voucherId/:employeeFileId',forceBrute.notBruteSecure,auth.autorizedRole([5]),voucher.voucherGetById);// obtiene vouchers

module.exports=router;