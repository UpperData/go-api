const model=require('../db/models/index');
var crypto = require("crypto"); 
const { Op } = require("sequelize");
async function passwordResetEnable(req,res){ // hablita el cambio de password
    const {accountId}=req.params
    const t = await model.sequelize.transaction();  	
    return await model.account.findOne({       
    where: {id:accountId},
    }).then(async function (rsUser){	
        if(rsUser){
            //general codigo 4 digitos 
            var now=new Date();                  
            token= crypto.randomBytes(4).toString('hex')+now.getTime();
            token = token.slice(-4);                  
            //var token =  await servToken.newToken(dataAccount,allRole,'passwordReset',dateTime) //generar Token
            await model.account.update({hashConfirm:token},{where:{id:rsUser.id}},{transaction:t})
            .then(async function(rsAccount){                 
                await t.commit();                    
                res.status(200).json({data:{"result":true,"message":"Se autorizó al usuario para actualizar su password","token":token}});
            }).catch(async function (error){
                await t.rollback();
                res.status(403).json({data:{"result":false,"message":"Algo salió mal autorizando cambio de password"}});
            })
        }else{
            await t.rollback();
            res.status(403).json({data:{"result":false,"message":"Usuario no existe"}});
        }
    }).catch(async function(error){
        await t.rollback();
        console.log(error);
        res.status(403).json({data:{"result":false,"message":"Algo salió mal validando cuenta de usuario"}});
    })
}
async function activateAccount(req,res){
    const {email}=req.params
    await model.account.update(
        {isActived:true,tries:6} ,
        {where:{email}}).then(async function (rsAcitvteAccount){
        res.status(200).json({data:{"result":true,"message":"Cuenta reactivada satisfactoriamente"}});
    }).catch(async function(error){        
        res.status(403).json({data:{"result":false,"message":"Algo salió mal reactivando cuenta de usuario"}});
    })
}
async function getAccountWithToken(req,res){
    return await model.account.findAll({
        attributes:['id','name','email','hashConfirm'],
        where:{
            hashConfirm:{[Op.not]:null}
        }       
    }).then(async function(rsAccount){
        res.status(200).json({data:{"result":true,"message":"Busqueda satisfactoria","data":rsAccount}});
    }).catch(async function(error){
        res.status(403).json({data:{"result":false,"message":"Algo salió mal obteniendo registros"}});
    })
}
module.exports={passwordResetEnable,activateAccount,getAccountWithToken};