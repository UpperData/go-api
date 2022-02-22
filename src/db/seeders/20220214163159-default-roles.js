'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('roles', [
      {id:4,name: 'Upper',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:5,name: 'Admin',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:6,name: 'Méd. General',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:7,name: 'Enfermería',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:8,name: 'Méd. Esp. Coordinador',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:9,name: 'Méd. Esp. Coordinador Jefe',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:10,name: 'Jefe Chofer Analista Méd.',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:11,name: 'Nutricionista',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:12,name: 'Lic. Cardio Pulmonar',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:13,name: 'Chofer  Asistencia Méd.',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:14,name: 'Coordinador Enfermería',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:15,name: 'Coordinador Administrativo',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:16,name: 'Asistente Laboratorio',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:17,name: 'Secretaria Post Consulta',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:18,name: 'Recepción RX',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:19,name: 'Bioanalista',isActived:true,createdAt: new Date(),updatedAt: new Date()},
      {id:20,name: 'Supervisor Cuenta',isActived:true,createdAt: new Date(),updatedAt: new Date()}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('roles', null, {});
  }
};
