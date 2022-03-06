const express =require ('express');
const router= express.Router();
const employeeFile=require('../controllers/employeefile.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.get('/Admin/EMPLoyeeFILE/Get/:id',forceBrute.notBruteSecure,auth.autorizedRole([5]), employeeFile.getEmployeeFile); // agrega permisos a un role

module.exports=router;