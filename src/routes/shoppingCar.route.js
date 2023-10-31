const express =require ('express');
const router= express.Router();
const car=require('../controllers/shoppingCar.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');


router.post('/CAR/AdD',forceBrute.notBruteSecure,auth.autorizedRole(['*']),car.AddShoppingCar) // Retorna car

module.exports=router;
