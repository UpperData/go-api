const model=require('../db/models/index');
const { Op } = require("sequelize");
async function getEmployeeFile(req,res){
    const {id}=req.params;
    await model.employeeFile.findOne({        
        where:{id}
    }).then(async function(rsEmployeeFile){
        res.status(200).json({"data":{"result":true,"message":"Busqueda Satisfactorio","data":rsEmployeeFile}});
    }).catch(async function(error){           
        res.status(403).json({"data":{"result":false,"message":"Algo salió mal, intente nuevamente"}});
    });

}
async function addEmployeeFile(req,res){
    const{fisrtName, lastName,documentId,address,email,cargo,birthdate,
        phone,photo,digitalDoc,observation,academic,cursos,experience,contacto,isActive}=req.body;
    
    if(fisrtName==null || lastName==null || documentId==null ||email==null,cargo==null,phone==null,academic==null,experience==null){
        const t = await model.sequelize.transaction(); 
        const accountFinded=await model.account.findOne({attributes:['id'],where:{email}});         
        let accountId=null;        
        if(accountFinded ){        

            if(accountFinded.id>0){
                accountId=accountFinded.id;
                //Actualiza informacion personal de la cuenta
                let people= {
                    "document":documentId,
                    "firstName":fisrtName,
                    "lastName":lastName,
                    "birthdate":birthdate                     
                }
                await model.account.update({people},{where:{email}},{transaction:t});
            }
            
        }
        await model.employeeFile.create({fisrtName, lastName,documentId,address,email,accountId,cargo,
        phone,photo,digitalDoc,observation,academic,cursos,experience,contacto,isActive},{transaction:t}).then(async function(rsEmployeeFile){
            t.commit();
            res.status(200).json({"data":{"result":true,"message":"Procesado Satisfactoriamente","data":rsEmployeeFile}});
        }).catch(async function(error){
            t.rollback(); 
            console.log(error);           
            if(error.name='SequelizeUniqueConstraintError'){
                console.log(error);
                res.status(403).json({"data":{"result":false,"message":error.message}});    
            }else{
                res.status(403).json({"data":{"result":false,"message":"Algo salió mal, intente nuevamente"}});
            }
        })
    }
    
}
async function editEmployeeFile(req,res){
    const{id,fisrtName, lastName,documentId,address,email,cargo,birthdate,
        phone,photo,digitalDoc,observation,academic,cursos,experience,contacto,isActive}=req.body;
        const t = await model.sequelize.transaction();  
        const accountFinded=await model.account.findOne({attributes:['id'],where:{email}}); 
        console.log(accountFinded);        
        let accountId=null;        
        if(accountFinded ){        
            console.log("encontro");
            if(accountFinded.id>0){
                console.log("Hay id");
                accountId=accountFinded.id;
                //Actualiza informacion personal de la cuenta
                let people= {
                    "document":documentId,
                    "firstName":fisrtName,
                    "lastName":lastName,
                    "birthdate":birthdate                     
                }
                await model.account.update({people},{where:{email}},{transaction:t});
            }
            
        }
    
    if(fisrtName==null || lastName==null || documentId==null ||email==null,cargo==null,phone==null,academic==null,experience==null){
        
        await model.employeeFile.update({fisrtName, lastName,documentId,address,email,cargo,
        phone,photo,digitalDoc,observation,academic,cursos,experience,contacto,accountId,isActive},{where:{id}},{transaction:t}).then(async function(rsEmployeeFile){
            t.commit();
            res.status(200).json({"data":{"result":true,"message":"Procesado Satisfactoriamente","data":rsEmployeeFile}});
        }).catch(async function(error){
            t.rollback();
            consosel.log(error)
            res.status(403).json({"data":{"result":false,"message":error.message}});
        })
    }  
}
async function getEmployeeFileByGroups(req,res){
    const {grp} =req.query;  
    return await model.role.findAll({
        attributes:[['id','roleId'],'name','isActived'],
        where:{
            isActived:true,
            id:{
                [Op.or]:[grp]
            }
        },
        include:[{
            model:model.accountRole,
            require:false,
            attributes:[['id','roleAccountId']],
            include:[
                {
                    model:model.account,
                    require:false,
                    attributes:[['id','accountId'],'name','email'],
                    include:[
                        {   
                            model:model.employeeFile,
                            require:false
                        }
                    ]
                    
                   
                }
            ]
        }]
    }).then(async function(rsEmploye){
        res.status(200).json({"data":{"result":true,"message":"Busqueda satisfactoria","data":rsEmploye}});
    }).catch(async function(error){
        console.log(error);
        res.status(403).json({"data":{"result":false,"message":"Algo salió mal, intente nuevamente"}});
    })
}
module.exports={getEmployeeFile,addEmployeeFile,editEmployeeFile,getEmployeeFileByGroups}