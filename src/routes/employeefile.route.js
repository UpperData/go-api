const express =require ('express');
const router= express.Router();
const employeeFile=require('../controllers/employeefile.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.get('/Admin/EMPLoyeeFILE/Get/:id',forceBrute.notBruteSecure,auth.autorizedRole([5]), employeeFile.getEmployeeFile); // Buscar una ficha de empleado
router.post('/ADMin/eMPLoyEEFILE/ADd/',forceBrute.notBruteSecure,auth.autorizedRole([5]), employeeFile.addEmployeeFile); // agrega una ficha de empleado
router.put('/ADmin/emPLoyeeFiLE/EDiT/',forceBrute.notBruteSecure,auth.autorizedRole([5]), employeeFile.editEmployeeFile); // modifica una ficha de empleado
router.get('/EMplOyeFIle/BYGRoUP/get/',forceBrute.notBruteSecure,auth.autorizedRole([5]), employeeFile.getEmployeeFileByGroups); // retorna empleados por grupo 


module.exports=router;