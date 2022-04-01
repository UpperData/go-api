const model=require('../db/models/index');
const { Op } = require("sequelize");

async function fixerPermissions(req,res){
    const t = await model.sequelize.transaction();
    await model.role.findAll().then(async function(rsRole){
        console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
        console.log(rsRole);
        for (let index = 0; index < rsRole.length; index++) { // recorre todos lo roles            
            if(rsRole[index].id!=5){
                await model.permission.findAll().then(async function(rsPermission){ //recorre permisos 
                    for (let j = 0; j < rsPermission.length; j++) {                       
                        try{
                            await model.grantRole.create({roleId:rsRole[index].id,permissionId:rsPermission[j].id,isActived:false},{transaction:t})
                        }catch(error){
                            console.log("Role:",rsRole[index].id,"Permision:",rsPermission[j].id);
                            if(error.name=="SequelizeUniqueConstraintError"){
                                console.log("Actualizando");
                                await model.grantRole.update({roleId:rsRole[index].id,permissionId:rsPermission[j].id,isActived:false},
                                    {where:{roleId:rsRole[index].id,permissionId:rsPermission[j].id}},{transaction:t})
                            }else{                                
                                console.log(error.name);                                                           
                                //res.status(403).json({data:{"result":false,"message":error.message}});
                                //res.end();
                            }
                        }                                         
                    }
                })
            }
        }
        t.commit();
        res.status(200).json({data:{"result":true,"message":"Reparación exitosa"}});
    })/*.catch(async function(error){
        t.rollback();
        console.log(error);
        res.status(403).json({data:{"result":false,"message":error.message}});
    })*/
}

module.exports={fixerPermissions};