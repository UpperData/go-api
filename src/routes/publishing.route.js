const express =require ('express');
const router= express.Router();
const publishing=require('../controllers/publishing.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');

router.put('/invetory/publishe/set',forceBrute.notBruteSecure,auth.autorizedRole([5]), publishing.setPublishing); // sube o da de baja a una publicación


module.exports=router;