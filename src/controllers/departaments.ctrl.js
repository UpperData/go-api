const model=require('../db/models/index');

async function getDepartament(req,res){
    const {id}=req.params;
    if(id!='*'){
        //Busca un modulo
        return await model.departament.findOne({
            where:{id}
        }).then(async function(rsDepartament){
            if(rsDepartament){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsDepartament}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }
            
        }).catch(async function(errror){
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos los roles
        return await model.departament.findAll({order:['name']}).then(async function(rsDepartament){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsDepartament}});        
        }).catch(async function(errror){
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }
}
async function createDepartament(req,res){ 
    const{name}=req.body;
    const t = await model.sequelize.transaction();
    return await model.departament.create({name},{transaction:t}).then(async function(rsDepartament){
        t.commit()
        res.status(200).json({"data":{"result":true,"message":"Registro Satisfactorio","data":rsDepartament}});      
    }).catch(async function(error){  
        t.rollback()  
        console.log(error);        
        res.status(403).json({"data":{"result":false,"message":"Algo salió mal creando registro"}});  
    })
}
async function editDepartament(req,res){
    const t = await model.sequelize.transaction();
    const{id,name}=req.body;
    return await model.departament.update({name},{where:{id}},{transaction:t}).then(async function(rsDepartament){
        t.commit()
        res.status(200).json({"data":{"result":true,"message":"Actualización Satisfactoria","data":rsDepartament}});      
    }).catch(async function(error){
        t.rollback();
        res.status(403).json({"data":{"result":false,"message":"Algo salió mal actualizando registro"}});  
    })
}
module.exports={getDepartament,createDepartament,editDepartament}