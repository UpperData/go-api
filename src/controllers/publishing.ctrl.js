const model=require('../db/models/index');
const { Op } = require("sequelize");
const serviceToken=require('./serviceToken.ctrl');
const generals=require('./generals.ctrl');

async function getPublishing(req,res){    
    const {articleId}=req.params;
    const dataToken=await serviceToken.dataTokenGet(req.header('Authorization').replace('Bearer ', ''));     
    if(id!='*'){
        //Busca inventario de un articulo
        return await model.inventory.findOne({            
            where:{articleId}
        }).then(async function(rsPhotype){
            if(rsPhotype){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsPhotype}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }            
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos el inventario de una tienda
        return await model.inventory.findAll(            
            {                 
                where:{storeId:dataToken['data']['shop'].id},
                order:['updatedAt']}).then(async function(rsPhotype)
            {
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsPhotype}});
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }    


}
async function setPublishing(req,res){
    const {articleId,isPublished}=req.body
    const dataToken=await generals.currentAccount(req.header('Authorization').replace('Bearer ', ''));    
   
    return await model.inventory.update({isPublished},{where:{articleId}})
    .then(async function(rsPublising){
        if(rsPublising){
            res.status(200).json({"data":{"result":true,"message":"Publicación satisfatoria","data":rsPublising}});        
        }          
    }).catch(async function(error){            
        console.log(error)
        res.status(403).json({"data":{"result":false,"message":"Algo salió mal, intente nuevamente"}});        
    })
   
}

module.exports={getPublishing,setPublishing};