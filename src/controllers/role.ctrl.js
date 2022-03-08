const model=require('../db/models/index');
const { Op } = require("sequelize");

async function getRole(req,res){ 
    const {id}=req.params;
    if(id!='*'){
        //Busca un role
        return await model.role.findOne({
            where:{id}
        }).then(async function(rsRole){
            if(rsRole){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsRole}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe grupo con este código"}});            
            }
            
        }).catch(async function(errror){
            console.log(error)
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos los roles
        return await model.role.findAll({order:['name']}).then(async function(rsRole){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsRole}});        
        }).catch(async function(errror){
            console.log(error)
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }
    
}
async function createRole(req,res){ 
    const{name,isActived}=req.body;
    const t = await model.sequelize.transaction();
    return await model.role.create({name,isActived:true},{transaction:t}).then(async function(rsRole){
        t.commit();
        res.status(200).json({"data":{"result":true,"message":"Registro Satisfactorio","data":rsRole}});      
    }).catch(async function(error){        
        t.rollback();
        res.status(403).json({"data":{"result":false,"message":"Algo salió mal registrando grupo"}});  
    })
}
async function editRole(req,res){
    const{id,name,isActived}=req.body;
    const t = await model.sequelize.transaction();
    return await model.role.update({name,isActived},{where:{id}},{transaction:t}).then(async function(rsRole){
        t.commit();
        res.status(200).json({"data":{"result":true,"message":"Actualización Satisfactoria","data":rsRole}});      
    }).catch(async function(error){
        t.rollback();
        console.log(error)
        res.status(403).json({"data":{"result":false,"message":"Algo salió mal actualizando grupo"}});  
    })
}

module.exports={getRole,createRole,editRole}

