async function currentAccount(token){
	try{
		var  payload= await jwt.decode(token,process.env.JWT_SECRET);
		
		if (Date.now() >= payload.exp * 1000) {
			return false;
		}else{
			const dataToken={"data":{"account":payload.account,"role":payload.role, "people":payload.people,"shop":payload.shop,
			"type":payload.type,"dateStart":payload.dateTimeLogin,"bid":payload.bidId}}
			return dataToken;  
		}
	}catch(erro){
		return false;
	}
}
module.exports={currentAccount}