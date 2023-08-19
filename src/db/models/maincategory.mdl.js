'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mainCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mainCategory.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    url: DataTypes.STRING,
    isActived: DataTypes.STRING,
    order:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'mainCategory',
  });
  return mainCategory;
};