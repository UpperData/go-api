const model=require('../db/models/index');
const { Op } = require("sequelize");
const serviceToken=require('./serviceToken.ctrl');


async function assignmentNew(req,res){
    const{accountId,articleId,quantity}=req.body;
    const dataToken=await serviceToken.dataTokenGet(req.header('Authorization').replace('Bearer ', ''));     
    const t = await model.sequelize.transaction();
    await model.accountRole.findAndCountAll({ // valida si es medico
        attributes:['id'],
        where:{
            accountId,
            roleId:[6,8,9]}
    }).then(async function(rsAccountRole){
        if(rsAccountRole.count>0){
            // valida existencia en inventario
            await model.inventory.findOne({
                attributes:['id','existence'],
                where:{articleId}
            }).then(async function(rsExistence){                
                if(rsExistence ){
                    if(rsExistence.existence>=quantity){
                        await model.assignment.create({accountId:accountId, articleId, quantity,responsible:{"account":dataToken['account'],"people":dataToken['people']}},{transaction:t}).then(async function(rsAssignmet){
                        }).then(async function(rsAppointment){
                            t.commit();
                            res.status(200).json({data:{"result":true,"message":"Asignación satisfactoria"}});
                        }).catch(async function(error){                
                            t.rollback();
                            res.status(403).json({data:{"result":false,"message":error.message}});
                        })
                    }else{                    
                        res.status(403).json({data:{"result":false,"message":"Existencia("+rsExistence.existence+") es menor a cantidad asignada"}});
                    }                    
                }else{                    
                    res.status(403).json({data:{"result":false,"message":"Articulo no existe en inventario"}});
                }
            }).catch(async function(error){                
                t.rollback();
                res.status(403).json({data:{"result":false,"message":error.message}});
            })          
        }else{
            t.rollback();
            res.status(403).json({data:{"result":false,"message":"Cuenta no tiene membresía de médico"}});
        }        
    }).catch(async function(error){                
        t.rollback();
        res.status(403).json({data:{"result":false,"message":error.message}});
    })    
}
async function assignmentByDoctor(req,res){
    const{accountId}=req.params;
    await model.accountRole.findAndCountAll({
        attributes:['id'],
        where:{
            accountId,
            roleId:[6,8,9]}
    }).then(async function(rsAccountRole){
        if(rsAccountRole.count>0){
            await model.assignment.findAll({
                where:{accountId},
                include:[                    
                    {
                        model:model.article,
                        attributes:['id','name','description']
                    }
                ]
            }).then(async function(rsAssignmet){                
                res.status(200).json({data:{"result":true,"message":"Busqueda satisfactoria","data":rsAssignmet}});
            }).catch(async function(error){
                console.log(error);                
                res.status(403).json({data:{"result":false,"message":error.message}});
            })
        }else{
            
            res.status(403).json({data:{"result":false,"message":"Cuenta no tiene membresía de médico"}});
        }
    }).catch(async function(error){                        
        res.status(403).json({data:{"result":false,"message":error.message}});
    }) 
}
async function assignmentUpdate(req,res){
    const{assignmentId,accountId,articleId,quantity}=req.body;
    const dataToken=await serviceToken.dataTokenGet(req.header('Authorization').replace('Bearer ', ''));     
    const t = await model.sequelize.transaction();
    await model.accountRole.findAndCountAll({
        attributes:['id'],
        where:{
            accountId,
            roleId:[6,8,9]}
    }).then(async function(rsAccountRole){
        if(rsAccountRole.count>0){
            await model.assignment.update(
                {accountId:accountId, articleId, quantity,responsible:{"account":dataToken['account'],"people":dataToken['people']}},
                {where:{id:assignmentId}},{transaction:t}).then(async function(rsAssignmet){
            }).then(async function(rsAppointment){
                t.commit();
                res.status(200).json({data:{"result":true,"message":"Asignación satisfactoria"}});
            }).catch(async function(error){
                console.log(error);
                t.rollback();
                res.status(403).json({data:{"result":false,"message":error.message}});
            })
        }else{
            t.rollback();
            res.status(403).json({data:{"result":false,"message":"Cuenta no tiene membresía de médico"}});
        }
        
    }).catch(async function(error){                
        t.rollback();
        res.status(403).json({data:{"result":false,"message":error.message}});
    })    
}
module.exports={assignmentNew,assignmentByDoctor,assignmentUpdate};