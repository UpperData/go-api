'use strict';
const {
  Model
} = require('sequelize');
Model.sequelize.query(`SELECT setval('public.articles_id_seq',21, true)`);// actualizado 
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`SELECT setval('public.articles_id_seq',21, true)`)
    await queryInterface.bulkInsert('articles', [
      {id:14,name:'Medicine 21',createdAt: new Date(),updatedAt: new Date()},
      {id:15,name:'Medicine 22',createdAt: new Date(),updatedAt: new Date()},
      {id:16,name:'Medicine 23',createdAt: new Date(),updatedAt: new Date()},
      {id:17,name:'Medicine 24',createdAt: new Date(),updatedAt: new Date()},
      {id:18,name:'Medicine 25',createdAt: new Date(),updatedAt: new Date()},
      {id:19,name:'Medicine 26',createdAt: new Date(),updatedAt: new Date()},
      {id:20,name:'Medicine 27',createdAt: new Date(),updatedAt: new Date()},
      {id:21,name:'Medicine 28',createdAt: new Date(),updatedAt: new Date()},
      {id:22,name:'Medicine 29',createdAt: new Date(),updatedAt: new Date()},
      {id:23,name:'Medicine 30',createdAt: new Date(),updatedAt: new Date()},
      {id:24,name:'Medicine 31',createdAt: new Date(),updatedAt: new Date()},
      {id:25,name:'Medicine 32',createdAt: new Date(),updatedAt: new Date()},
      {id:26,name:'Medicine 33',createdAt: new Date(),updatedAt: new Date()}
      
    ], {});
    
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  }
  
};

