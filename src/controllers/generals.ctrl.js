const model=require('../db/models/index');
const { Op } = require("sequelize");
async function currentAccount(token){
	try{
		var  payload= await jwt.decode(token,process.env.JWT_SECRET);
		
		if (Date.now() >= payload.exp * 1000) {
			return false;
		}else{
			const dataToken={"data":{"account":payload.account,"role":payload.role, "people":payload.people,"shop":payload.shop,
			"type":payload.type,"dateStart":payload.dateTimeLogin,"bid":payload.bidId}}
			return dataToken;  
		}
	}catch(erro){
		return false;
	}
}
async function getCivil(req,res){ 
    const {id}=req.params;
    if(id!='*'){
        //Busca un estado civil
        return await model.civil.findOne({
            attributes:['id','name'],
            where:{id}
        }).then(async function(rsCivil){
            if(rsCivil){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsCivil}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }            
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos estado civil
        return await model.civil.findAll(            
            { attributes:['id','name']           ,
           order:['id']}).then(async function(rsCivil){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsCivil}});        
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }    
}

async function getPhoneType(req,res){ 
    const {id}=req.params;
    if(id!='*'){
        //Busca un estado civil
        return await model.phoneType.findOne({
            attributes:['id','name','icon'],
            where:{id}
        }).then(async function(rsPhotype){
            if(rsPhotype){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsPhotype}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }            
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos estado civil
        return await model.phoneType.findAll(            
            { attributes:['id','name','icon']           ,
            order:['id']}).then(async function(rsPhotype){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsPhotype}});        
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }    
}
async function getDepartament(req,res){
	const {id}=req.params;
    if(id!='*'){
        //Busca un Departamento
        return await model.departament.findOne({
            attributes:['id','name'],
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
        //Busca todos Sub Deaprtament
        return await model.departament.findAll(            
            { attributes:['id','name'],
            order:['id']}).then(async function(rsDepartament){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsDepartament}});        
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    } 
}
async function getSubDepartament(req,res){
	const {depId}=req.params;
    if(depId!='*'){
        //Busca un Departamento
        return await model.subDepartament.findAll({
            attributes:['id','name'],
            where:{departamentId:depId}
        }).then(async function(rsSubDepartament){
            if(rsSubDepartament){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsSubDepartament}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }            
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos Sub Deaprtament
        return await model.subDepartament.findAll(            
            { attributes:['id','name'],
            include:[
                {
                    model:model.departament,
                    attributes:[['id','departamentId'],'name']
                }
            ],
            order:['id']}).then(async function(rsSubDepartament){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsSubDepartament}});        
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    } 
}
async function getCargo(req,res){
	const {depId}=req.params;
    if(depId!='*'){
        //Busca un Departamento
        return await model.cargo.findAll({
            attributes:['id','name'],
            where:{departamentId:depId}
        }).then(async function(rsCargo){
            if(rsCargo){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsCargo}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }            
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos Cargos de un departamento
        return await model.cargo.findAll(            
            { attributes:['id','name'],
            include:[
                {
                    model:model.departament,
                    attributes:[['id','departamentId'],'name']
                }
            ],
            order:['id']}).then(async function(rsCargo){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsCargo}});        
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    } 
}
async function getPatienType(req,res){
	const {id}=req.params;
    if(id!='*'){
        //Busca un Departamento
        return await model.patientType.findAll({
            attributes:['id','name'],
            where:{id}
        }).then(async function(rsPatientType){
            if(rsPatientType){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsPatientType}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }            
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos Cargos de un departamento
        return await model.patientType.findAll(            
            { attributes:['id','name'],
            order:['id']}).then(async function(rsPatientType){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsPatientType}});        
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    } 
}
async function getState(req,res){ 
    const {id}=req.params;
    if(id!='*'){
        //Busca un estados de Venezuela
        return await model.state.findOne({
            attributes:['id','name'],
            where:{id}
        }).then(async function(rsState){
            if(rsState){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsState}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }            
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos de estados de Venezuela
        return await model.state.findAll(            
            { attributes:['id','name']           ,
           order:['id']}).then(async function(rsState){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsState}});        
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }    
}
async function getCitiesByState(req,res){ 
    const {stateId}=req.params;
    if(stateId!='*'){
        //Busca un estados de Venezuela
        return await model.city.findAll({
            attributes:['id','name','isCapital'],
            where:{stateId},
            include:[
                {
                    model:model.state,
                    attributes:['id','name']
                }
            ]
        }).then(async function(rsCity){
            if(rsCity){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsCity}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }            
        }).catch(async function(error){  
            console.log(error)    
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos de estados de Venezuela
        return await model.city.findAll(            
            { attributes:['id','name','isCapital'],
            include:[
                {
                    model:model.state,
                    attributes:['id','name']
                }
            ],
           order:['id']}).then(async function(rsCity){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsCity}});        
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }    
}
async function getProvincesByState(req,res){ 
    const {stateId}=req.params;
    if(stateId!='*'){
        //Busca un estados de Venezuela
        return await model.province.findAll({
            attributes:['id','name'],
            where:{stateId},
            include:[
                {
                    model:model.state,
                    attributes:['id','name']
                }
            ]
        }).then(async function(rsProvince){
            if(rsProvince){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsProvince}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }            
        }).catch(async function(error){  
            console.log(error)    
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos de estados de Venezuela
        return await model.province.findAll(            
            { attributes:['id','name'],
            include:[
                {
                    model:model.state,
                    attributes:['id','name']
                }
            ],
           order:['id']}).then(async function(rsProvince){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsProvince}});        
        }).catch(async function(errror){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }    
}
async function getParroquiaByProvince(req,res){ 
    const {provinceId}=req.params;
    if(provinceId!='*'){
        //Busca un estados de Venezuela
        return await model.parroquia.findAll({
            attributes:['id','name'],
            where:{provinceId},
            include:[
                {
                    model:model.province,
                    attributes:['id','name']
                }
            ]
        }).then(async function(rsParroquia){
            if(rsParroquia){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsParroquia}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }            
        }).catch(async function(error){  
            console.log(error)    
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todos de estados de Venezuela
        return await model.parroquia.findAll(            
            { attributes:['id','name'],
            include:[
                {
                    model:model.province,
                    attributes:['id','name']
                }
            ],
           order:['id']}).then(async function(rsParroquia){
            res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsParroquia}});        
        }).catch(async function(error){            
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }    
}
module.exports={getCivil,currentAccount,getPhoneType,getDepartament,getSubDepartament,getCargo,getPatienType,getState,getCitiesByState,getProvincesByState,getParroquiaByProvince}