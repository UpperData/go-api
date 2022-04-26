'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDefinition =  await queryInterface.describeTable('assignments');
    if (!tableDefinition.accountId) {
        
        await queryInterface.addColumn('assignments', 'accountId', {
            type: Sequelize.INTEGER,
            allowNull: false
        });
    }   
    if (!tableDefinition.isActived) {
        
        await queryInterface.addColumn('assignments', 'isActived', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue:true
        });
    } 
    if (tableDefinition.doctorId) {
        
        await queryInterface.removeColumn('assignments', 'doctorId');
    }      
    return Promise.resolve();
},
  down: async (queryInterface, Sequelize) => {        
        await queryInterface.removeColumn('assignments','accountId');
        await queryInterface.removeColumn('assignments','isActived');
        await queryInterface.addColumn('assignments', 'accountId');
    }
};
