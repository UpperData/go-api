const express =require ('express');
const router= express.Router();
const membership=require('../controllers/accountRoles.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.post('/membeRship/asing/revoque/',forceBrute.notBruteSecure,auth.autorizedRole([5]),membership.addMembership);// asigna o revoca membresia

module.exports=router;