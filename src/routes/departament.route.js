const express =require ('express');
const router= express.Router();
const dept=require('../controllers/departaments.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.get('/DepT/GET/:id',forceBrute.notBruteSecure,auth.autorizedRole(['*']),dept.getDepartament); //Buscar departamentos
router.post('/DePT/NEW/',forceBrute.notBruteSecure,auth.autorizedRole([5]),dept.createDepartament); //Crear departamentos
router.put('/DEpT/UPdate/',forceBrute.notBruteSecure,auth.autorizedRole([5]),dept.editDepartament); //Modificar departamentos
module.exports=router;