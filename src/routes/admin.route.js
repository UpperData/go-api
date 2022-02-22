const express =require ('express');
const router= express.Router();
const admin=require('../controllers/admin.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.get('/accOunT/passWord/ReSeT/:accountId',forceBrute.notBruteSecure,auth.autorizedRole([5]),admin.passwordResetEnable); // Registro de cuentas de usuario
router.get('/accOunT/aCcOUNT/ACTIVaTE/:email',forceBrute.notBruteSecure,auth.autorizedRole([5]),admin.activateAccount); // Registro de cuentas de usuario
router.get('/ACCount/ENaBLed/to/RESTAR',forceBrute.notBruteSecure,auth.autorizedRole([5]),admin.getAccountWithToken); //Obtiene datos cuentas on yoken habilitado
module.exports=router;