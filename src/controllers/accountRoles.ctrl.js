const models=require('../db/models/index');

async function getRoleByAccount(req,res){
	const{accountId}=req;
	return await models.accountRole.findAll({ 
		where:{accountId,isActived:true},
		include:[
			{
			model:models.account
			},
			{
			model:models.role
			}
		]
	})
	.then(async function(srResult){		
		return srResult; 		
	}).catch(async function(error){		
		return { data:{"result":false,"message":"Algo salió mal, no se pudo buscar "}};		
	})	
}
async function add(req,res){ // metodo de uso interno
	
	const {accountId,RoleId,statusId}=req;
	const t = await model.sequelize.transaction();
	return await models.accountRoles.create({accountId,RoleId,StatusId:statusId},{transaction:t})
	.then(function(rsResult){
		t.commit()
		return rsResult;
	}).catch(async function (error){
		t.rollback();
		return { data:{"result":false,"message":"Algo salió mal asignando permiso"}};
	})
}
async function addMembership(req,res){ // agregra membresia
	
	const {accountId,roleId,isActived}=req.body;
	
	const t = await models.sequelize.transaction();
	return await models.accountRole.findAndCountAll({
		attributes:['accountId','roleId'],
		where:{accountId,roleId}
	}).then(async function(rsMembership){
		
		if(rsMembership.count>0) {
			//actualiza
			await models.accountRole.update({isActived,where:{accountId,roleId},transaction:t})
			.then(function(rsResult){
				t.commit()
				if(isActived){
					res.status(200).json({"data":{"result":true,"message":"Membresia asignada"}});   
				}else{
					res.status(200).json({"data":{"result":true,"message":"Membresia revocada"}});   
				}				
			}).catch(async function (error){
				t.rollback();
				console.log(error);
				res.status(403).json({"data":{"result":false,"message":"Algo salió mal creando membresía"}}); 
			})
		}else{
			//crea
			await models.accountRole.create({accountId,roleId,isActived},{transaction:t})
			.then(function(rsResult){
				t.commit()
				res.status(200).json({"data":{"result":true,"message":"Membresia asignada","data":rsResult}});   
			}).catch(async function (error){
				t.rollback();
				console.log(error);
				res.status(403).json({"data":{"result":false,"message":"Algo salió mal asignando membresía"}}); 
			})
		}
	}).catch(async function (error){
		t.rollback();
		console.log(error);
		res.status(403).json({"data":{"result":false,"message":"Algo salió mal, intente nuevamente"}}); 
	})
	
}
module.exports={getRoleByAccount,add,addMembership};
