const model=require('../db/models/index');
const { Op } = require("sequelize");

async function getPermission(req,res){ 
    const {id}=req.params;
    if(id!='*'){
        //Busca un modulo
        return await model.permission.findOne({
            where:{id},
            include:[{
                model:model.subModule,
                attributes:['id','isActived','name']
            },{
                model:model.operation,
                attributes:['id','isActived','name']
            }]
        }).then(async function(rsPermission){
            if(rsPermission){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsPermission}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }
            
        }).catch(async function(errror){
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos los roles
        return await model.permission.findAll(            
            {
            include:[{
                model:model.subModule,
                attributes:['id','isActived','name']
            },{
                model:model.operation,
                attributes:['id','isActived','name']
            }],
           order:['id']}).then(async function(rsPermission){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsPermission}});        
        }).catch(async function(error){
            console.log(error);
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }    
}
async function getPermisionByGroup(req,res){
    const {roleId}=req.params;
    return await model.grantRole.findAll({where:{roleId}}).then(async function(rsGetPermision){
        await model.permission.findAll(            
            {            
            include:[{
                model:model.subModule,
                attributes:['id','isActived','name']
            },{
                model:model.operation,
                attributes:['id','isActived','name']
            }],
           order:['name']}).then(async function(rsPermission){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsPermission}});        
        }).catch(async function(errror){
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }).catch(async function(error){
        console.log(error);
        res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}}); 
    })    
}  
async function getPermisionByModule(req,res){

}

module.exports={getPermission,getPermisionByGroup}