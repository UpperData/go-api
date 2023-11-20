const model=require('../db/models/index');
const { Op } = require("sequelize");
const serviceToken=require('./serviceToken.ctrl');
const generals=require('./generals.ctrl');

async function getShoppingCar(req,res){      
    const{accountId}=req.params  
    const dataToken=await serviceToken.dataTokenGet(req.header('Authorization').replace('Bearer ', ''));         
    if(dataToken){
        //Busca carrito de ocmpra
        return await model.shoppingCar.findAll({            
            where:{accountId}
        }).then(async function(rsCar){
            if(rsCar){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsCar}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"Debe inicicar sesión"}});            
            }            
        }).catch(async function(error){ 
            console.log(error);           
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        res.status(403).json({"data":{"result":false,"message":"Debe inicicar sesión"}});   
    } 
}
async function AddShoppingCar(req,res){      
    const{accountId,items}=req.body  
    const dataToken=await serviceToken.dataTokenGet(req.header('Authorization').replace('Bearer ', ''));         
    if(dataToken){
        //Busca carrito de ocmpra
        return await model.shoppingCar.create({accountId,items})
        .then(async function(rsCar){
            if(rsCar){
                res.status(200).json({"data":{"result":true,"message":"Item agregado"}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"Debe inicicar sesión"}});            
            }            
        }).catch(async function(error){ 
            console.log(error);           
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal agregando artículo"}});        
        })
    }else{
        res.status(403).json({"data":{"result":false,"message":"Debe inicicar sesión"}});   
    } 
}
module.exports={getShoppingCar,AddShoppingCar};