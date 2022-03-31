'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  inventory.init({
    articleId: {
      type: DataTypes.INTEGER,
      unique:true,
      references:{model:{tableName:'articles',schema:'public'},key:'id'}
    },
    minStock: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    existence: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    price: {
      type:DataTypes.DECIMAL,
      allowNull:false,
      defaultValue:0
  }
  }, {
    sequelize,
    modelName: 'inventory',
  });
  return inventory;
};