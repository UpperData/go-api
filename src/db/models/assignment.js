'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class assignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  assignment.init({
    doctorId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    responsible: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'assignment',
  });
  return assignment;
};