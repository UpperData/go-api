const model=require('../db/models/index');
const { Op } = require("sequelize");

async function history(req,res){
    const {id}=req.params;
    await model.patient.findOne({        
        where:{id}
    }).then(async function(rsPatienet){
        res.status(200).json({"data":{"result":true,"message":"Busqueda Satisfactorio","data":rsEmployeeFile}});
    }).catch(async function(error){           
        res.status(403).json({"data":{"result":false,"message":"Algo salió mal, intente nuevamente"}});
    });
}
module.exports={history}