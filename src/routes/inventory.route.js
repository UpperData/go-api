const express =require ('express');
const router= express.Router();
const inventory=require('../controllers/inventory.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.post('/inVeNtOrY/aSSgNMEnt/New',forceBrute.notBruteSecure,auth.autorizedRole([5]), inventory.assignmentNew); // Asigna medicamento a un medico
router.get('/invENtOrY/aSSGNmEnT/byDoCTOR/:accountId',forceBrute.notBruteSecure,auth.autorizedRole([5]), inventory.assignmentByDoctor); // obtienes asignaciones por doctor
router.put('/invENtOrY/asSGNmEnT/UPDATE',forceBrute.notBruteSecure,auth.autorizedRole([5]), inventory.assignmentUpdate); // Actualiza asignación

module.exports=router;