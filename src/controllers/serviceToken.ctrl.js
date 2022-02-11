var jwt=require('jwt-simple');
var moment=require('moment');
require('dotenv').config();

 async function newToken(account,roles,type,dateTime,people){
	var exp;
	 if(type=="passwordReset"){
		exp=moment().add(2,"hours").unix();
	 }else if(type=="forgot"){
		exp=moment().add(1,"days").unix();
	}else if(type=="newAccount"){
		exp=moment().add(3,"days").unix();
	}else if(type=="login"){
		exp=moment().add(4,"hours").unix();
	}else if(type=="updateEmail"){
		exp=moment().add(1,"days").unix();
	}else if(type=="test"){
		exp=moment().add(1,"days").unix();
	}else
	{
		exp=moment().add(1,"days").unix()
	}
	 
    var payload={
	type,
	account:{"id":account.id,"email":account.email,"name":account.name},
	role:roles,	
	people:people,
	dateTimeLogin:dateTime,	
	rem:"lo-veremos-cara-a-cara",
	iat:moment().unix(),
	exp
    };

    var token= await jwt.encode(payload,process.env.JWT_SECRET);
      
    return token;
}
async function dataTokenGet(token){
	try{
		var  payload= await jwt.decode(token,process.env.JWT_SECRET);
		
		if (Date.now() >= payload.exp * 1000) {
			return false;
		}else{
			const dataToken={"account":payload.account,"role":payload.role, "people":payload.people,"dateStart":payload.dateTimeLogin}
			return dataToken;  
		}
	}catch(erro){
		return false;
	}
}
module.exports={newToken,dataTokenGet}
