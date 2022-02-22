'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('accounts', [
      {id:3,name: 'uppercema',email:'uppercema@gmail.com',pass:'j88888888',creater:'{"account":{"id":"owener","name":"Upper Data Solutions"}}',token:'null',isConfirmed:true,isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:4,name: 'admin',email:'cema@gmail.com',pass:'j99999999',creater:'{"account":{"id":"owener","name":"Upper Data Solutions"}}',token:'null',isConfirmed:true,isActived:true,createdAt: new Date(),updatedAt: new Date()}
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('accounts', null, {});
     
  }
};
