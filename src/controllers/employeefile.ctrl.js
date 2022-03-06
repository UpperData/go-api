const model=require('../db/models/index');

async function getEmployeeFile(req,res){
    const {id}=req.params;
    await model.employeeFile.findOne({        
        where:{id}
    }).then(async function(rsEmployeeFile){
        res.status(200).json({"data":{"result":true,"message":"Busqueda Satisfactorio","data":rsEmployeeFile}});
    }).catch(async function(error){
        console.log(error);     
        res.status(403).json({"data":{"result":false,"message":"Algo salió mal, intente nuevamente"}});
    });

}
module.exports={getEmployeeFile}