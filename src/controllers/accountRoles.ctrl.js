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
async function add(req,res){
	
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
module.exports={getRoleByAccount,add};
