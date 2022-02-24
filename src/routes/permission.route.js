const express =require ('express');
const router= express.Router();
const permission=require('../controllers/permission.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.get('/froNT/pErMiSsIon/GeT/:id',forceBrute.notBruteSecure,auth.autorizedRole([5]), permission.getPermission); // retorna permiso
router.get('/fRoNT/PErMiSSIon/GeT/grOUp/:roleId',forceBrute.notBruteSecure,auth.autorizedRole([5]), permission.getPermisionByGroup); //  retorna permiso por grupo
router.post('/adMiN/pERMISSION/nEw/',auth.autorizedRole([5]), permission.addPermision);
router.put('/adMiN/pErMIssION/update/',auth.autorizedRole([5]), permission.updatePermission);
module.exports=router;
