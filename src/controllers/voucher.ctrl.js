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

module.exports={voucherCreate};