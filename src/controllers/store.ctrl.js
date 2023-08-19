
const model=require('../db/models/index');
const utils = require('./utils.ctrl');
const serviceToken=require('./serviceToken.ctrl');
const roleAccount=require('./accountRoles.ctrl');
const bcrypt=require("bcryptjs"); // encripta caracteres
var crypto = require("crypto"); // valor aleatorio
const { Op } = require("sequelize");
//const { token } = require('morgan');
require ('dotenv').config();

async function createStore(req,res){
    //valida campos requeridos
    const  {name,logo,description,isItHaveBuild,phone,address,parroquiaId,
            storeTypeId,isActived,fiscalInfo,deliveryInfo}=req.body;
    const t = await model.sequelize.transaction();
    await model.store.create({name,logo,description,isItHaveBuild,phone,address,
        parroquiaId,storeTypeId,isActived,fiscalInfo,deliveryInfo},{transaction:t})
        .then(async function(rsStoreCreate){
            t.commit();
            res.status(200).json({"data":{"result":true,"message":"Tienda registrada satisfactoriamente"}});
        }).catch(async function(error){
            t.rollback();
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal creando tienda, intente nuevamente"}});
        });
}
async function findStore(req,res){
    const {id}=req.params;
    if(id!='*'){
        //Busca una tienda
        return await model.store.findOne({
            where:{id}
        }).then(async function(rsStore){
            if(rsStore){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsStore}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }
            
        }).catch(async function(errror){
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todas las tiendas
        return await model.store.findAll({order:['name']}).then(async function(rsStore){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsStore}});        
        }).catch(async function(errror){
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }
}
async function updateStore(req,res){
    const  {id,name,logo,description,isItHaveBuild,phone,address,parroquiaId,
            storeTypeId,isActived,fiscalInfo,deliveryInfo}=req.body;
    const t = await model.sequelize.transaction();
    await model.store.update({name,logo,description,isItHaveBuild,phone,address,
        parroquiaId,storeTypeId,isActived,fiscalInfo,deliveryInfo},{where:{id}},{transaction:t})
        .then(async function(rsStoreCreate){
            t.commit();
            res.status(200).json({"data":{"result":true,"message":"Tienda actualizada satisfactoriamente"}});
        }).catch(async function(error){
            t.rollback();
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal actualizando tienda, intente nuevamente"}});
        });
}
module.exports={
    createStore, // crea una tienda
    findStore,  //buscar tienda
    updateStore // actualizar tienda


}