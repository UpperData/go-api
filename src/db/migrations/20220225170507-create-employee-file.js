'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employeeFiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fisrtName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      documentId: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.BOOLEAN
      },
      address: {
        type: Sequelize.JSONB
      },
      email: {
        type: Sequelize.STRING
      },
      cargoId: {
        type: Sequelize.INTEGER
      },
      departamentId: {
        type: Sequelize.INTEGER
      },
      phone: {
        type: Sequelize.JSONB
      },
      photo: {
        type: Sequelize.STRING
      },
      digitalDoc: {
        type: Sequelize.STRING
      },
      onservation: {
        type: Sequelize.TEXT
      },
      academic: {
        type: Sequelize.JSONB
      },
      cursos: {
        type: Sequelize.JSONB
      },
      experience: {
        type: Sequelize.JSONB
      },
      contacto: {
        type: Sequelize.JSONB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employeeFiles');
  }
};