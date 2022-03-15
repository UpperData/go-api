'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDefinition =  await queryInterface.describeTable('roles');
    if (!tableDefinition.photo) {
        
        await queryInterface.addColumn('roles', 'icon', {
            type: Sequelize.STRING,
            allowNull: true
        });
    }        
    return Promise.resolve();
},
  down: async (queryInterface, Sequelize) => {        
        await queryInterface.removeColumn('roles', 'icon');
    }
};
