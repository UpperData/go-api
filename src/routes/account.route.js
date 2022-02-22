const express =require ('express');
const router= express.Router();
const account=require('../controllers/account.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.post('/accOunT/RegisTER',forceBrute.notBruteSecure, account.registerAccount); // Registro de cuentas de usuario
router.post('/PASSwORD/RestarRT',forceBrute.notBruteSecure, account.passwordRestart); // Restaura la contraseña
router.post('/PASSwORD/UPDATE',forceBrute.notBruteSecure,auth.autorizedRole(['*']),account.passwordUpdate); // Actualizar la contraseña
router.get('/accoUnt/EmAIl/VALIDAtor/:email',forceBrute.notBruteSecure,account.validateEmail); //Valida dirección de correo electronico
router.get('/aCCoUnt/EMAIl/Get/QUEStIOns/:email',forceBrute.notBruteSecure,account.getSecret); //Optienes respuestas secretas
router.get('/ACCounT/restoRe/SeCReCT/:email',forceBrute.notBruteSecure,account.restoreSecret);
router.get('/cema/validate/SeCRE/toKEN/:token',forceBrute.notBruteSecure,account.resetSecretAnswer); //Evalua token de solicitud de actualización de secret answer
router.get('/cema/security/cont/:token',forceBrute.notBruteSecure,account.updateSecret); //Actualiza Respuesta secreta


module.exports=router;