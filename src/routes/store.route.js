const express =require ('express');
const router= express.Router();
const store=require('../controllers/store.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.post('/admIn/sTORE/Create',forceBrute.notBruteSecure,auth.autorizedRole([5]), store.createStore); // consulta roles
router.put('/admin/store/EDit',forceBrute.notBruteSecure,auth.autorizedRole([5]), store.updateStore); //Actializa tienda
router.get('/adMin/SToRE/get/:id',forceBrute.notBruteSecure,auth.autorizedRole([5]), store.findStore); //Busca tienda por id
module.exports=router;