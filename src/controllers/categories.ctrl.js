
const model=require('../db/models/index');
const { Op } = require("sequelize");
const serviceToken=require('./serviceToken.ctrl');

async function getMainCategories(req,res){
    await model.mainCategory.findAll({attributes:{exclude:['isActived','createdAt','updatedAt']},where:{isActived:true}})
    .then(async function(rsMainCategory){
        res.status(200).json({data:{"result":true,"message":"Consulta satisfactoria","data":rsMainCategory}});
    }).catch(async function(error){
        res.status(403).json({data:{"result":false,"message":error.message}})
    })
}

async function addMainCategories(req,res){
    const {name,icon,url,isActived,order} = req.body;
    const t = await model.sequelize.transaction();
    await model.sequelize.transaction();
    await model.mainCategory.create({name,icon,url,isActived,order},{transaction:t})
    .then(async function(rsMainCategory){
        t.commit();
        res.status(200).json({data:{"result":true,"message":"Registro agregado con exito","data":rsMainCategory}});
    }).catch(async function(error){
        t.rollback();
        res.status(403).json({data:{"result":false,"message":error.message}})
    })
}
module.exports={
    getMainCategories, // obtienes categorias activas
    addMainCategories // agrega una nueva categoria

}