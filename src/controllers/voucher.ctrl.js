const model=require('../db/models/index');
const { Op } = require("sequelize");
const serviceToken=require('./serviceToken.ctrl');

async function voucherCreate(req,res){
    const {employeeFileId,amount,details} =req.body
    const t=await model.sequelize.transaction();
    if(details.length>0){
        return await model.voucher.create({employeeFileId,amount,isActived:true,details},{transtion:t}).then(async function (rsCoucher){
            t.commit();
            res.status(200).json({"data":{"result":true,"message":"Voucher registrado satisfactoriamente"}});  
        }).catch(async function(error){
            t.rollback();
            res.status(403).json({"data":{"result":false,"message":error.message}}); 
        })
    }else{
        res.status(403).json({"data":{"result":false,"message":"Debe agregar items del recibo"}});
    }
    
}
async function voucherGetById(req,res){
    const {voucherId,employeeFileId} =req.params; console.log(req.params)
    if(voucherId>0){ // busca voucher de un empleado
        return await model.voucher.findOne({
            attributes:[['id','voucherId'],'employeeFileId','amount','details'],
            where:{id:voucherId,isActived:true}
        }).then(async function (rsVoucher){ 
            res.status(200).json({"data":{"result":true,"message":"Resultado de busqueda","data":rsVoucher}});  
        }).catch(async function(error){
            res.status(403).json({"data":{"result":false,"message":error.message}}); 
        })
    }else if(employeeFileId>0 && voucherId==0){ // busca voucher por ID
        return await model.voucher.findAll({
            attributes:[['id','voucherId'],'employeeFileId','amount','details'],
            where:{employeeFileId,isActived:true}
        }).then(async function (rsVoucher){ 
            res.status(200).json({"data":{"result":true,"message":"Resultado de busqueda","data":rsVoucher}});  
        }).catch(async function(error){
            res.status(403).json({"data":{"result":false,"message":error.message}}); 
        })
    }else{
        res.status(403).json({"data":{"result":false,"message":"Debe ingresar parametros de busqueda empleado y/o numero de voucher"}});
    }
    
}
module.exports={voucherCreate,voucherGetById};