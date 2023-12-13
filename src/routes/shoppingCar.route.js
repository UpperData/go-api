const express =require ('express');
const router= express.Router();
const car=require('../controllers/shoppingCar.ctrl');
const auth=require('../controllers/middleware/auth.ctrl');
const forceBrute=require('../controllers/middleware/noBrute.ctrl');


router.post('/CAR/AdD',forceBrute.notBruteSecure,auth.autorizedRole(['*']),car.AddShoppingCar) // registra car
router.get('/CAR/GET',forceBrute.notBruteSecure,auth.autorizedRole(['*']),car.getShoppingCar) // Retorna car
router.get('/',(req,res)=>{
    res.status(200).json({result:'🚀 repuestosGO is working in port de forma segura'});
    //console.log('🚀 repuestosGO is working in port:', app.get('PORT'), 'de forma segura');
  })
module.exports=router;
