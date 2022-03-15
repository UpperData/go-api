const express =require ('express');
const router= express.Router();
const general=require('../controllers/generals.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.get('/civil/get/:id',forceBrute.notBruteSecure,auth.autorizedRole(['*']), general.getCivil); // retorna estado civil
router.get('/phone/get/type/:id',forceBrute.notBruteSecure,auth.autorizedRole(['*']), general.getPhoneType); // retorna phone types
router.get('/departament/get/:id',forceBrute.notBruteSecure,auth.autorizedRole(['*']), general.getDepartament); // retorna departemento de la empresa
router.get('/sUBDepartament/get/:depId',forceBrute.notBruteSecure,auth.autorizedRole(['*']), general.getSubDepartament); // retorna SubDepartemento de la empresa
router.get('/CargO/GEt/:depId',forceBrute.notBruteSecure,auth.autorizedRole(['*']), general.getCargo); // retorna Cargos de la empresa
router.get('/pAtieNt/TYPE/geT/:id',forceBrute.notBruteSecure,auth.autorizedRole(['*']), general.getPatienType); // retorna tipo de paciente
module.exports=router;
