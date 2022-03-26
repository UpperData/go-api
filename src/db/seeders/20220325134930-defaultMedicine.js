'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('articles', [
      {id:1,name:'Medicine 1',createdAt: new Date(),updatedAt: new Date()},
      {id:2,name:'Medicine 2',createdAt: new Date(),updatedAt: new Date()},
      {id:3,name:'Medicine 3',createdAt: new Date(),updatedAt: new Date()},
      {id:4,name:'Medicine 4',createdAt: new Date(),updatedAt: new Date()},
      {id:5,name:'Medicine 5',createdAt: new Date(),updatedAt: new Date()},
      {id:6,name:'Medicine 6',createdAt: new Date(),updatedAt: new Date()},
      {id:7,name:'Medicine 7',createdAt: new Date(),updatedAt: new Date()},
      {id:8,name:'Medicine 8',createdAt: new Date(),updatedAt: new Date()},
      {id:9,name:'Medicine 9',createdAt: new Date(),updatedAt: new Date()},
      {id:10,name:'Medicine 10',createdAt: new Date(),updatedAt: new Date()},
      {id:11,name:'Medicine 11',createdAt: new Date(),updatedAt: new Date()},
      {id:12,name:'Medicine 12',createdAt: new Date(),updatedAt: new Date()},
      {id:13,name:'Medicine 13',createdAt: new Date(),updatedAt: new Date()}
      
    ], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  }
};
