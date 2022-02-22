
const model=require('../db/models/index');
const utils = require('./utils.ctrl');
const serviceToken=require('./serviceToken.ctrl');
const roleAccount=require('./accountRoles.ctrl');
const bcrypt=require("bcryptjs");
const { Op } = require("sequelize");
require ('dotenv').config();

async function registerAccount(req,res){
    const {email,name,pass,people,secret,roleId}=req.body  
    for (let index = 0; index < secret.length; index++) { //Encripta respuestas secretas
        
        secret[index].answer=bcrypt.hashSync( secret[index].answer, 10)       
    }      
    //const dataToken=await serviceToken.dataTokenGet(req.header('Authorization').replace('Bearer ', '')); 
    const dataToken={"people":{"firstName":"Angel","lastName":"Diaz"},"account":{"email":"angel.elcampeon@gmail.com"},}
    const t = await model.sequelize.transaction();  
    let audit=[]
    audit.push({"people":dataToken.people});
    audit.push({"account":dataToken.account});
    //envia email al nuevo usuario
        
    // OPtiene todos los administradores del sistema (email) 
    await model.account.create( {email,name,pass,people,creater:audit,secret, token:"null",isConfimr:true,isActived:true},{transaction:t})
    .then(async function(rsAccount){   
        
         
        await model.accountRole.findAll({
            attributes:['id'],
            where:{roleId:5}
            }).then (async function(rsAccountRole){
                for (let index = 0; index < rsAccountRole.length; index++) {
                    //console.log(rsAccountRole[index].id);
                    await model.notification.create({ 
                        from:process.env.EMAIL_ADMIN,
                        body:{
                            subject:"Cuenta CEMA creada",
                            text:dataToken.people.firstName+" "+dataToken.people.lastName + " ha creado una nueva cuenta de usuario con el nombre "+rsAccount.name+"("+rsAccount.id+")",
                            title:"Nueva cuenta CEMA creada satisfactoriamente",
                            subtitle:rsAccount.name+"("+rsAccount.id+")",
                            link:"http://cema/account/details/"+rsAccount.id
                            },
                        read:false,
                        accountRolesId:rsAccountRole[index].id
                    })
                }                
            }).then(async function(rsNotification){
                
                t.commit();
               
                 //envia notificaión al usuario                
                if(await utils.isInternetConnect()){ //valida conexion a internet
                    const urlLogin=process.env.HOST_BACK+"/cema/login/";                    
                    var sendMail= await utils.sendMail({ // Notifica al nuevo usuario
                        from:"CEMA OnLine <" + process.env.EMAIL_MANAGER +	'>',
                        to:rsAccount.email,
                        subject:"Nuevo usuario creado",
                        text:"para iniciar su sesión en CEMA On Line haga click en el enlace ",
                        title:"Ya eres usuario de CEMA OnLine",
                        subtitle:null,                
                        action:urlLogin
                    });
                    let adminEmail=await model.account.findAll({ //busca lista de email de administradores del sistemas
                        attributes:['email'],
                        include:[{
                            model:model.accountRole,
                            atributtes:['id'],
                            where:{roleId:5}
                        }]
                    })
                    let allAdminEmail
                    for (let index = 0; index < adminEmail.length; index++) {
                        if(allAdminEmail!=null){
                            allAdminEmail = allAdminEmail +","+ adminEmail[index].dataValues.email;
                        }else{
                            allAdminEmail=adminEmail[index].dataValues.email;
                        }
                    }             
                    // envia email a administrador
                    const urlProfile=process.env.HOST_BACK+"/cema/profile/";                  
                   
                    await utils.sendMail({
                        from:"CEMA OnLine <" + process.env.EMAIL_MANAGER +	'>',
                        to:allAdminEmail+=',centroespecialidadesmadriz@gmail.com,arcangel272002@gmail.com',
                        subject:"Nuevo usuario creado",
                        text:dataToken.people.firstName+" "+dataToken.people.lastName + " ha creado una nueva cuenta de usuario con el nombre "+rsAccount.email+"("+rsAccount.id+")",
                        title:"Nueva cuenta CEMA OnLine creada satisfactoriamente",
                        subtitle:rsAccount.name+"("+rsAccount.id+")",                
                        link:"http://cema/account/details/"+rsAccount.id,
                        action:urlLogin
                    });                   
                }  
                res.status(200).json({"data":{"result":true,"message":"Cuenta de usuario registrada satisfactoriamente"}});               
            }).catch(async function(error){
                console.log(error);
               
                res.status(403).json({"data":{"result":false,"message":"Algo salió mal creando cuenta de usuario"}});         
            })
            
    }).catch(async function(error){        
        console.log(error);
        if(error.name=='SequelizeUniqueConstraintError'){
            res.status(403).json({"data":{"result":false,"message":error.parent.detail}})	    
        }else{
            res.status(403).json({"data":{"result":false,"message":"Algo salio mal procesando registro","code":"P006"}})	
        }
        
    })

}
async function loginAccount(req,res){     
    const{nick,pass}=req.body;
    let  email=null;
    let name=null;
    let dateTime=new Date();      
    
    if(await utils.validMail(nick)){
        email=nick;
    }else{
        name=nick;
    }
    
    return await model.account.findOne({       
        where: {
            [Op.or]:{
				name,
				email,
			},
           }
        })
        .then(async function (rsUser){	
            if(rsUser){
                if(!rsUser.isActived){
                    res.status(403).json({"data":{"result":false,"message":"Usuario Bloqueado, comuniquese con el administrador del sistema"}})        
                }else{
                    if(rsUser.tries>5){                        
                        await model.account.update({isActived:false,hashConfirm:null},{where:{id:rsUser.id}}).then(async function(rsStatus){ //Actualiza status
                               
                            role= await roleAccount.getRoleByAccount({accountId:rsUser.id});  
                            await model.notification.create({ 
                                from:"Administrador CEMA",                                
                                body:{
                                    subject:"Cuenta CEMA Bloqueada",
                                    text:"La cuenta"+ rsUser.email+"("+rsUser.id+")" +" ha sido bloqueada por exceso de intentos ",
                                    title:"Cuenta Bloqueada",
                                    subtitle:rsUser.name+"("+rsUser.id+")",
                                    link:"http://cema/account/details/"+rsUser.id
                                    },
                                read:false,
                                accountRolesId:role[0]
                            }) 
                            res.status(403).json({"data":{"result":false,"message":"su cuenta a sido bloqueda por exceder limite de intentos"}}) 
                        }).catch(async function(error){     
                            console.log(error)
                            res.status(403).json({data:{"result":false,"message":"Algo salió mal actualizando cuenta de usuario"}});        
                        })
                        
                    }else{
                        return await  bcrypt.compare(pass,rsUser.pass)
                        .then(async  function (rsPass){
                            if(rsPass){												
                                return  await roleAccount.getRoleByAccount({accountId:rsUser.id})  
                                .then(async function (rsAccRoles){
                                    if(rsAccRoles.length>0){
                                        var tokenRole
                                        var allRole  = [];
                                        for (let i=0; i<rsAccRoles.length; i++){
                                            allRole.push({"id":rsAccRoles[i]['role'].id,"name":rsAccRoles[i]['role'].name});
                                        }								
                                        dataAccount={"id":rsUser.id,"name":rsUser.name,"email":rsUser.email} //Datos de la cuenta	
                                        dataPeople=rsUser.people;					
                                        var token =  await serviceToken.newToken(dataAccount,allRole,'login',dateTime,dataPeople) //generar Token 									
                                        await model.account.update({tries:0},{where:{id:rsUser.id}}).then(async function(rsNewPassword){ //Actualiza tries
                                            res.status(200).json({data:{"result":true,"message":"Usted a iniciado sesión " + rsUser.email ,"token":token,tokenRole,"people":dataPeople,"account":dataAccount,"role":allRole}});        
                                        }).catch(async function(error){                        
                                            res.status(200).json({data:{"result":true,"message":"Usted a iniciado sesión " + rsUser.email ,"token":token,tokenRole,"people":dataPeople,"account":dataAccount,"role":allRole,"advertencia":"ocurrio un error intentando actualizar número de intentos"}});        
                                        }) 
                                    }
                                    else{				
                                        res.status(403).json({data:{"result":false,"message":"Usuario no esta activo en un grupo"}});
                                    }
                                })	
                            }else {
                                await model.account.update({tries:rsUser.tries+1},{where:{id:rsUser.id}}).then(async function(rsNewPassword){ //Actualiza tries
                                    intento=6-(rsUser.tries+1)
                                    res.status(403).json({"data":{"result":false,"message":"Contraseña inválida, le restan " + intento +" intentos"}})        
                                }).catch(async function(error){                        
                                    res.status(403).json({data:{"result":false,"message":"Contraseña inválida, Algo salió mal actualizando cuenta de usuario"}});        
                                })				
                                
                            }
                        })
                    }
                }
                
				
			}
			else {
				res.status(200).json({data:{"result":false,"message":"Usuario no registrado"}});
			}			
        })
}
async function passwordRestart(req,res){
    const {token,newPassword,secret,email}=req.body; 
    return await model.account.findOne({
        attributes:['id','hashConfirm','secret','email','tries'],
        where:{email}}) // valida si existe cuenta
    .then(async function(rsAccount){         
       if(rsAccount.tries<6){//Valida que no pase de 5 intentos
            if(rsAccount.hashConfirm===token){//valida si el token es correcto
                //valida respuestas secretas
                var secretValid=[];
                var answerValid=false;
                for (let index = 0; index < rsAccount.secret.length; index++) { 
                   
                    if(await bcrypt.compare(secret[index],rsAccount.secret[index].answer) ){
                        secretValid[index]=true
                    }                
                }
                if(secretValid.filter(st=>true).length==rsAccount.secret.length){
                    answerValid=true;
                } else{
                    answerValid=false;
                }
                if(answerValid){//valida respuesta secreta es correcto
                    await model.account.update({pass:newPassword,hashConfirm:null,tries:0},{where:{id:rsAccount.id}}).then(async function(rsNewPassword){ //Actualiza password
                        res.status(200).json({data:{"result":true,"message":"Password actualizado satisfactoriamente"}});        
                    }).catch(async function(error){                        
                        res.status(403).json({data:{"result":false,"message":"Algo salió mal actualizando password"}});        
                    })
                }else{//valida respuesta secreta es invalida
                    await model.account.update({tries:rsAccount.tries+1},{where:{id:rsAccount.id}}); 
                    intento=6-(rsAccount.tries+1)   
                    res.status(403).json({data:{"result":false,"message":"Respuesta secreta invalida, le quedan "+ intento +" intentos"}});                    
                }
            }else{
                await model.account.update({tries:rsAccount.tries+1},{where:{id:rsAccount.id}});
                intento=6-(rsAccount.tries+1)   
                res.status(403).json({data:{"result":false,"message":"Token de restauración no valido, debe comunicarse con el administrador del sistema, le quedan"+ intento + " intentos"}});                
            }
       }else{
        await model.account.update({isActived:false},{where:{id:rsAccount.id}});
        res.status(403).json({data:{"result":false,"message":"Cuenta bloqueda por limite de intentos, debe comunicarse con el administrador del sistema"}});   
       }
        
    }).catch(async function(error){  
        console.log(error);      
        res.status(403).json({data:{"result":false,"message":"Algo salió mal validando cuenta de usuario"}});
    })
}
async function passwordUpdate(req,res){
    //opteiner id de cuenta actual
    const dataToken=await serviceToken.dataTokenGet(req.header('Authorization').replace('Bearer ', ''));
    const t = await model.sequelize.transaction();    
    const {newPassword}=req.body; 
    return await model.account.update({pass:newPassword},{where:{id:dataToken.account.id}},{transaction:t}).then(async function(rsNewPassword){ //Actualiza password
        t.commit();
        res.status(200).json({data:{"result":true,"message":"Password actualizado satisfactoriamente"}});        
    }).catch(async function(error){
        console.log(error);
        t.rollback();
        res.status(403).json({data:{"result":false,"message":"Algo salió mal actualizando password"}});        
    })
}
async function validateEmail(req,res){
    const {email}= req.params;
    return await model.account.findOne({
        attributes:['id','email','isActived'],
        where:{email}
    }).then(async function(rsAccount){
        if(rsAccount){
            if(rsAccount.isActived){
                res.status(200).json({data:{"result":true,"message":"Correo electrónico (Email) valido","data":rsAccount.email}});
            }else{
                res.status(403).json({data:{"result":false,"message":"Cuenta bloqueada comuniquese con el administrador del sistema"}});        
            }            
        }else{
            res.status(403).json({data:{"result":false,"message":"Correo electrónico (Email) no es valido"}});        
        }        
    }).catch(async function(error){
        res.status(403).json({data:{"result":false,"message":"Algo salió mal validando correo electrónico (Email)"}});        
    })
}
async function getSecret(req,res){
    const {email}= req.params;
    return await model.account.findOne({
        attributes:['secret','isActived'],
        where:{email}
    }).then(async function(rsAccount){
        if(rsAccount){
            if(rsAccount.isActived){
                if(rsAccount.secret.length>1){
                    let question=[];
                    for (let index = 0; index < rsAccount.secret.length; index++) {                        
                        question.push(rsAccount['secret'][index].question);                       
                    }                    
                    res.status(200).json({data:{"result":true,"message":"Preguntas secretas retornadas con éxito","data":question}});
                }else{
                    res.status(403).json({data:{"result":false,"message":"Usuario no ha configurado sus preguntas secretas, debe comunicarse con el administrador del sistema"}});                
                }                
            }else{
                res.status(403).json({data:{"result":false,"message":"Cuenta bloqueada comuniquese con el administrador del sistema"}});        
            }             
        }else{
            res.status(403).json({data:{"result":false,"message":"Cuenta de usuario no registrada"}});        
        }        
    }).catch(async function(error){        
        res.status(403).json({data:{"result":false,"message":"Algo salió mal opteniendo preguntas secretas"}});        
    })
}
async function restoreSecret(req,res){
    const {email}= req.params;
    console.log(email)
    return await model.account.findOne({
        attributes:['id','email','isActived'],
        where:{email}
    }).then(async function(rsAccount){
        if(rsAccount){
            if(rsAccount.isActived){
                //Genera token 
                const token = await serviceToken.genRestoreSecret({account:{"id":rsAccount.id,"email":rsAccount.email,"name":rsAccount.name}});
               // console.log(token);
                //generar link de restauración
                const urlRestore=process.env.HOST_BACK+"/cema/validate/SeCRE/toKEN/" +token
                //rsAccount.email+=',centroespecialidadesmadriz@gmail.com,arcangel272002@gmail.com';
                
                var sendMail= await utils.sendMail({
                    from:"CEMA OnLine <" + process.env.EMAIL_MANAGER +	'>',
                    to:rsAccount.email,
                    subject:"Actualización de respuestas secretas TEST 42",
                    text:"Para continuar el proceso haga click en el link e ingrese lo datos solicitados",
                    title:"Actualización de respuestas secretas",
                    subtitle:null,                
                    action:urlRestore
                });
                if(sendMail){
                    res.status(200).json({data:{"result":true,"message":"Ingrese a su correo electrónico para continuar el proceso"}});    
                }else{
                    res.status(403).json({data:{"result":false,"message":"Algo salió mal procesando su solicitud, intente nuevamente"}});       
                }    
            }else{
                res.status(403).json({data:{"result":false,"message":"Cuenta bloqueada comuniquese con el administrador del sistema"}});        
            }            
        }else{
            res.status(403).json({data:{"result":false,"message":"Correo electrónico (Email) no es valido"}});        
        }        
    }).catch(async function(error){
        console.log(error);
        res.status(403).json({data:{"result":false,"message":"Algo salió mal validando correo electrónico (Email)"}});        
    })
}
async function resetSecretAnswer(req,res){
    const {token}=req.params; // recine token
    const dataToken=serviceToken.getTokenAll(token);//Optiene valores del token
    // valida que exista cuenta
    console.log(dataToken);
    if(dataToken.payload.exp<=moment().unix()){ // Valida expiración                      
        res.redirect(process.env.HOST_FRONT+"idetificationError?message="+"Su token a expirado, debe generar uno nuevo");
    }else { 
        await model.Account.findOne({where:{id:dataToken.payload['account'].id}})
        .then(async function (rsAccount){
            if(!rsAccount.isActived){
                res.status(403).json({data:{"result":false,"message":"Cuenta inactiva"}})
                
            }else{	
                //await model.Account.update({hashConfirm:null}, {where:{id:payload.account,statusId:1}})
                res.redirect(process.env.HOST_FRONT+"resetSecret?token="+token);				
            }	
        }).catch(async function(error){
            console.log(error);            
            res.redirect(process.env.HOST_FRONT+"idetificationError?message="+"Algo slaió mal validando su identidad");
        })
    }

}
async function updateSecret(req,res){
    const{token, secret}= req.body;
    if(dataToken.payload.exp<=moment().unix()){ // Valida expiración       
        res.redirect(process.env.HOST_FRONT+"idetificationError?message="+"Su token a expirado, debe generar uno nuevo");
    }else { 
        await model.Account.findOne({where:{id:dataToken.payload['account'].id}})
        .then(async function (rsAccount){
            if(!rsAccount.isActived){
                res.status(403).json({data:{"result":false,"message":"La cuenta inactiva"}})
            }else{	
                await model.Account.update({secret}, {where:{id:dataToken.payload['account'].id}}).the(async function(rsaccountUd){
                    res.status(200).json({data:{"result":true,"message":"Respuestas secretas actualizadas satisfactoriamente"}});   
                }).catch(async function(error){
                    res.status(403).json({data:{"result":false,"message":"Algo salió mal actualizando sus respuestas secretas, intente nuevamente"}});   
                })
                
            }	
        }).catch(async function(error){
            console.log(error);           
            res.redirect(process.env.HOST_FRONT+"idetificationError?message="+"Algo slaió mal validando su identidad");
        })
    }

}
module.exports={registerAccount,loginAccount,passwordRestart,passwordUpdate,validateEmail,getSecret,restoreSecret,resetSecretAnswer,updateSecret}