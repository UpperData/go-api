const model=require('../db/models/index');
const { Op } = require("sequelize");
var moment=require('moment');
async function appointmentNew(req,res){
    const{
        dateAppointment,hourAppointment,foreignId,siniestroId,address,isOpened,medialPersonal,appointmentTypeId,
        cedula,firstName,lastName,gender,nationality,patientTypeId,phone,birthdate,civil
    }=req.body
    let patientId=null;
    
    await model.patient.findAndCountAll({
        attributes:['id'], 
        where:{
            document:{
                number:cedula
            }
        }
    }).then(async function(rsPatient){        
        const t = await model.sequelize.transaction();
        if(rsPatient.count>0){    //exites el paciente  
            //patientId=  rsPatient['rows'][0].id;            
            await model.patient.update({                
                document,
                nombre: firstName,
                apellido: lastName,
                edad:birthdate,                
                phone: phone,
                patientTypeId
            },{where:{id:rsPatient['rows'][0].id}},{transaction:t}).then(async function(rsPatientupdate){
                patientId=rsPatientNew.id
            }).catch(async function(error){               
                t.rollback()
                res.status(403).json({data:{"result":false,"message":error.message}});
            })
        }
        else{ // registra paciente
            document={
                "nationality":nationality,
                "number":cedula,
                "gender":gender ,
                "civil":civil 
            }
            await model.patient.create({
                document,
                nombre: firstName,
                apellido: lastName,
                edad:birthdate,                
                phone: phone,
                patientTypeId
            },{transaction:t}).then(async function(rsPatientNew){
                patientId=rsPatientNew.id
            }).catch(async function(error){               
                t.rollback()
                res.status(403).json({data:{"result":false,"message":error.message}});
            })
        }
            await model.appointment.create({dateAppointment,hourAppointment,foreignId,siniestroId,address,isOpened,patientId,medialPersonal,appointmentTypeId},{transaction:t})
            .then(async function(rsAppointment){
                t.commit();
                res.status(200).json({data:{"result":true,"message":"Cita regsitrada satisfactoriamente"}});
            }).catch(async function(error){
                console.log(error);
                t.rollback()
                res.status(403).json({data:{"result":false,"message":error.message}});
            })
    })
}

async function updateAppointment(req,res){
    const{
        id,dateAppointment,hourAppointment,foreignId,siniestroId,address,isOpened,medialPersonal,appointmentTypeId,
        cedula,firstName,lastName,gender,nationality,patientTypeId,phone,birthdate,patientId,civil
    }=req.body

    document={
        "nationality":nationality,
        "number":cedula,
        "gender":gender,
        "civil":civil 
    }
    const t = await model.sequelize.transaction();
    await model.patient.update({   //Actualiza datos del paciente      
        document,
        nombre: firstName,
        apellido: lastName,
        edad:birthdate,                
        phone: phone,
        patientTypeId
    },{where:{id:patientId}},{transaction:t}).then(async function(rsPatientupdate){       

        await model.appointment.update( // Actualiza la cita si aun esta abierta
            {dateAppointment,hourAppointment,foreignId,siniestroId,address,isOpened,patientId,medialPersonal,appointmentTypeId},{where:{id,isOpened:true}},{transaction:t}
        ).then(async function(rsAppointment){
            
            t.commit();
            res.status(200).json({data:{"result":true,"message":"Cita actualizada satisfactoriamente"}});
        }).catch(async function(error){        
            t.rollback()
            res.status(403).json({data:{"result":false,"message":error.message}});
        })

    }).catch(async function(error){               
        t.rollback()
        res.status(403).json({data:{"result":false,"message":error.message}});
    })
}

async function getAppointment(req,res){ 
    const {id}=req.params;
    if(id!='*'){
        //Busca una cita
        return await model.appointment.findOne({            
            where:{id},
            include:[
                {
                    model:model.appointmentType,
                    attributes:[['id','appointmentTypeId'],'name']
                },
                {
                    model:model.patient,
                    include:[
                        {
                            model:model.patientType,
                            attributes:[['id','appointmentTypeId'],'name']
                        }
                    ]
                    
                }
            ]
        }).then(async function(rsAppointmentType){
            if(rsAppointmentType){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsAppointmentType}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existen registros"}});            
            }            
        }).catch(async function(error){  
            console.log(error)    
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })
    }else{
        //Busca todas las citas del mes
        let hoy=new Date();
        //console.log(hoy.getMonth());
        let month=hoy.getMonth()+1;
        let firstDayMont=new Date("2020-"+month+"-01");
        return await model.appointment.findAll({            
            where:{
                createdAt:{
                    [Op.between]:[firstDayMont,hoy]
                }
            },
            include:[
                {
                    model:model.appointmentType,
                    attributes:[['id','appointmentTypeId'],'name']
                },
                {
                    model:model.patient,
                    include:[
                        {
                            model:model.patientType,
                            attributes:[['id','appointmentTypeId'],'name']
                        }
                    ]
                    
                }
            ],
           order:['isOpened']
        }).then(async function(rsAppointmentType){
            if(rsAppointmentType){
                res.status(200).json({"data":{"result":true,"message":"Busqueda satisfatoria","data":rsAppointmentType}});        
            }else{
                res.status(403).json({"data":{"result":false,"message":"No existe registro con este código"}});            
            }            
        }).catch(async function(error){  
            console.log(error)    
            res.status(403).json({"data":{"result":false,"message":"Algo salió mal buscando registro"}});        
        })

    }    
}
module.exports={appointmentNew,updateAppointment,getAppointment}