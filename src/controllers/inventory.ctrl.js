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
            roleId:[6]}
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
            await model.inventory.findOne({
                attributes:['id','existence'],
                where:{articleId}
            }).then(async function(rsExistence){                
                if(rsExistence ){
                    if(rsExistence.existence>=quantity){
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
                        res.status(403).json({data:{"result":false,"message":"Cantidad mayor a la existencia"}});
                    }
        }else{
            t.rollback();
            res.status(403).json({data:{"result":false,"message":"Cuenta no tiene membresía de médico"}});
        }
        
    }).catch(async function(error){                
        t.rollback();
        res.status(403).json({data:{"result":false,"message":error.message}});
    })    
}

async function articleNew(req,res){
    const{name,description,existence}=req.body;
    const t=await model.sequelize.transaction();
    await model.article.create({name,description},{transaction:t}).then(async function(rsArticle){
        await model.inventory.create({articleId:rsArticle.id,existence},{transaction:t}).then(async function(rsArticle){
            t.commit();
            res.status(200).json({data:{"result":true,"message":"Nuevo articulo agregado satisfactoriamente"}});            
        }).catch(async function(error){
            t.rollback();
            res.status(403).json({data:{"result":false,"message":error.message}});
        })
    }).catch(async function(error){
        t.rollback();
        res.status(403).json({data:{"result":false,"message":error.message}});
    })
}
async function articleUpdate(req,res){
    const{id,name,description}=req.body;
    const t=await model.sequelize.transaction();
    await model.article.update({name,description},{where:{id}},{transaction:t}).then(async function(rsArticle){
        t.commit();
        res.status(200).json({data:{"result":true,"message":"Articulo actualizado satisfactoriamente"}});
    }).catch(async function(error){
        t.rollback();
        res.status(403).json({data:{"result":false,"message":error.message}});
    })
}
async function articlelist(req,res){ 
    const {id}=req.params;
    if(id!='*'){
        //Busca un estados de Venezuela
        return await model.article.findAll({
            attributes:['id','name','description'],
            where:{id}
        }).then(async function(rsArticle){
            if(rsArticle){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsArticle}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }            
        }).catch(async function(error){  
            console.log(error)    
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos de estados de Venezuela
        return await model.article.findAll(            
            { attributes:['id','name','description'],
           order:['id']}).then(async function(rsArticle){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsArticle}});        
        }).catch(async function(error){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }    
}
module.exports={assignmentNew,assignmentByDoctor,assignmentUpdate,articleNew,articleUpdate,articlelist};