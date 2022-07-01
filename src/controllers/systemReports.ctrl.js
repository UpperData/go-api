const model=require('../db/models/index');
const { Op } = require("sequelize");
const serviceToken=require('./serviceToken.ctrl');
const generals=require('./generals.ctrl');

//Reportes de RRHH

//-	Obtener personal activo
async function employeeFileActived(req,res){
    const {startDate,endDate}=req.params
    return await model.employeeFile.findAndCountAll({
        attributes:['id','fisrtName','lastName','documentId','email','cargo','phone','photo','isActive',['createdAt','fechaRegistro']],
        where:{
            isActive:true,
            createdAt:{
                [Op.between]:[startDate,endDate]
            }
        },
        order:['createdAt']
    }).then(async function(rsEmployee){
        res.status(200).json(rsEmployee)
    }).catch(async function(error){
        console.log(error);
        res.status(403).json(error.message);
    });
}
async function employeeFileNoActived(req,res){
    const {startDate,endDate}=req.params
    return await model.employeeFile.findAndCountAll({
        where:{
            isActive:false,
            createdAt:{
                [Op.between]:[startDate,endDate]
            }
        },
        order:['createdAt']
    }).then(async function(rsEmployee){
        res.status(200).json(rsEmployee)
    }).catch(async function(error){
        console.log(error);
        res.status(403).json(error.message);
    });
}
async function employeeFileFemale(req,res){
    const {startDate,endDate}=req.params
    return await model.employeeFile.findAndCountAll({
        attributes:['id','fisrtName','lastName','documentId','email','cargo','phone','photo','isActive',['createdAt','fechaRegistro']],
        where:{
            isActive:true,
            documentId:{
                gender:"M"
            },
            createdAt:{
                [Op.between]:[startDate,endDate]
            }
        },
        order:['createdAt']
    }).then(async function(rsEmployee){
        res.status(200).json(rsEmployee)
    }).catch(async function(error){
        console.log(error);
        res.status(403).json(error.message);
    });
}
async function employeeFileMale(req,res){
    const {startDate,endDate}=req.params
    return await model.employeeFile.findAndCountAll({
        attributes:['id','fisrtName','lastName','documentId','email','cargo','phone','photo','isActive',['createdAt','fechaRegistro']],
        where:{
            isActive:true,
            documentId:{
                gender:"H"
            },
            createdAt:{
                [Op.between]:[startDate,endDate]
            }
        },
        order:['createdAt']
    }).then(async function(rsEmployee){
        res.status(200).json(rsEmployee)
    }).catch(async function(error){
        console.log(error);
        res.status(403).json(error.message);
    });
}

//Atencion medica
//citas cerradadas
async function appointmenClosed(req,res){
    const {startDate,endDate}=req.params
    return await model.appointment.findAndCountAll({
        attributes:[['foreignId','id'],['dateAppointment','fecha'],['hourAppointment','hora'],'siniestroId','isOpened',['createdAt','fechaRegistro']],
        where:{
            isOpened:false,
            dateAppointment:{
                [Op.between]:[startDate,endDate]
            }
        },include:[
            {
                model:model.patient,
                attributes:['document','nombre','apellido','edad'],
                include:[
                    {
                        model:model.patientType ,
                        attributes:['id','name']
                    }
                ]
            }
        ]
        ,
        order:['createdAt']
    }).then(async function(rsEmployee){
        res.status(200).json(rsEmployee)
    }).catch(async function(error){
        console.log(error);
        res.status(403).json(error.message);
    });
}
//citas abiertas
async function appointmenOpened(req,res){
    const {startDate,endDate}=req.params
    return await model.appointment.findAndCountAll({
        attributes:[['foreignId','id'],['dateAppointment','fecha'],['hourAppointment','hora'],'siniestroId','isOpened',['createdAt','fechaRegistro']],
        where:{
            isOpened:true,
            dateAppointment:{
                [Op.between]:[startDate,endDate]
            }
        },include:[
            {
                model:model.patient,
                attributes:['document','nombre','apellido','edad'],
                include:[
                    {
                        model:model.patientType ,
                        attributes:['id','name']
                    }
                ]
            }
        ]
        ,
        order:['createdAt']
    }).then(async function(rsEmployee){
        res.status(200).json(rsEmployee)
    }).catch(async function(error){
        console.log(error);
        res.status(403).json(error.message);
    });
}
//citas tipo APS
async function appointmenAPS(req,res){
    const {startDate,endDate}=req.params
    return await model.appointment.findAndCountAll({
        attributes:[['foreignId','id'],['dateAppointment','fecha'],['hourAppointment','hora'],'siniestroId','isOpened',['createdAt','fechaRegistro']],
        where:{
            appointmentTypeId:1,
            dateAppointment:{
                [Op.between]:[startDate,endDate]
            }
        },include:[
            {
                model:model.patient,
                attributes:['document','nombre','apellido','edad'],
                include:[
                    {
                        model:model.patientType ,
                        attributes:['id','name']
                    }
                ]
            }
        ]
        ,
        order:['createdAt']
    }).then(async function(rsEmployee){
        res.status(200).json(rsEmployee)
    }).catch(async function(error){
        console.log(error);
        res.status(403).json(error.message);
    });
}
//citas tipo APS
async function appointmenDocicilio(req,res){
    const {startDate,endDate}=req.params
    return await model.appointment.findAndCountAll({
        attributes:[['foreignId','id'],['dateAppointment','fecha'],['hourAppointment','hora'],'siniestroId','isOpened',['createdAt','fechaRegistro']],
        where:{
            appointmentTypeId:2,
            dateAppointment:{
                [Op.between]:[startDate,endDate]
            }
        },include:[
            {
                model:model.patient,
                attributes:['document','nombre','apellido','edad'],
                include:[
                    {
                        model:model.patientType ,
                        attributes:['id','name']
                    }
                ]
            }
        ]
        ,
        order:['createdAt']
    }).then(async function(rsEmployee){
        res.status(200).json(rsEmployee)
    }).catch(async function(error){
        console.log(error);
        res.status(403).json(error.message);
    });
}
module.exports={employeeFileActived,employeeFileNoActived,employeeFileFemale,employeeFileMale,appointmenClosed,appointmenOpened,appointmenAPS,appointmenDocicilio}