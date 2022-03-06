'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cargos', [
      {id: 1,name:"Direcctor General CEO",departamentId:1,createdAt: new Date(),updatedAt: new Date()},
      {id: 2,name:"Gerente de Operaciones COO",departamentId:2,createdAt: new Date(),updatedAt: new Date()},
      {id: 3,name:"Gerente Comercial CSO",departamentId:3,createdAt: new Date(),updatedAt: new Date()},
      {id: 4,name:"Gerente de Mercadeo CMO",departamentId:4,createdAt: new Date(),updatedAt: new Date()},
      {id: 5,name:"Gerente de Recursos Humanos CHRO",departamentId:5,createdAt: new Date(),updatedAt: new Date()},
      {id: 6,name:"Gerente de Finanzas CFO",departamentId:6,createdAt: new Date(),updatedAt: new Date()},
      
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('cargos', null, {}); 
    
  }
};
