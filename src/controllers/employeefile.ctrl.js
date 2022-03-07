const model=require('../db/models/index');

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
    const{fisrtName, lastName,documentId,address,email,accountId,cargo,
        phone,photo,digitalDoc,observation,academic,cursos,experience,contacto}=req.body;

    if(fisrtName==null || lastName==null || documentId==null ||email==null,cargo==null,phone==null,academic==null,experience==null){
        await model.employeeFile.create({fisrtName, lastName,documentId,address,email,accountId,cargo,
        phone,photo,digitalDoc,observation,academic,cursos,experience,contacto}).then(async function(rsEmployeeFile){
            res.status(200).json({"data":{"result":true,"message":"Procesado Satisfactoriamente","data":rsEmployeeFile}});
        }).catch(async function(error){
            console.log(error.name);
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal, intente nuevamente"}});
        })
    }
    
}
module.exports={getEmployeeFile,addEmployeeFile}