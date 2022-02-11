var nodemailer = require("nodemailer");
require ('dotenv').config();
var internetAvailable = require("internet-available");
var jwt=require('jwt-simple');
const moment=require('moment');

async function isInternetConnect(){
    return internetAvailable({timeout: 3000,retries: 2}).then(() => {       
        return true
    }).catch(() => {
        return false
    });    
}


async function sendMail(data){ //Envia Correo electronico
    if(validMail){
        var transporter = nodemailer.createTransport({
            //GOOGLE SMTP
           pool: true,
            secure: true,
            host: 'smtp.gmail.com',
            port: 465,
            //ignoreTLS: false,
            //secure: false,
            auth: {               
                user: process.env.EMAIL_ADMIN,
                pass: process.env.PASS_EMAIL_ADMIN                
            }
        });
        // Definimos el email
        var mailOptions = {
            
            from: data.from,
            to: data.to,
            subject: data.subject,
            text: data.text,
            html:data.html
            
        };
        // Enviamos el email
        return transporter.sendMail(mailOptions)
    }else{
        return false;
    }
    
}
async function validMail(email){ //valida si el formato de un email es valido
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)){
       return true;
    } else {
        return false;
    }
}

async function getRoleEmail(data){
    let adminEmail=await model.account.findAll({ //busca lista de email de administradores del sistemas
        attributes:['email'],
        include:[{
            model:model.accountRole,
            atributtes:['id'],
            where:{roleId:data.role}
        }]
    })
    let allRoleEmail
    for (let index = 0; index < allRoleEmail.length; index++) {
        if(allRoleEmail!=null){
            allRoleEmail = allRoleEmail +","+ allRoleEmail[index].dataValues.email;
        }else{
            allRoleEmail=allRoleEmail[index].dataValues.email;
        }
    }
    return allRoleEmail; 
}
module.exports={isInternetConnect,sendMail,validMail,getRoleEmail}