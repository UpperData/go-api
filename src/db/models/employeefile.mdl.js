'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employeeFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employeeFile.init({
    fisrtName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    documentId: {
      type:DataTypes.STRING,
      allowNull:false
    },
    nationality: {
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
    address: {
      type:DataTypes.JSONB,
      allowNull:false
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      values:{
        isEmail:true
      }
    },
    accountId: {
      type: DataTypes.JSONB,
      allowNull:true
    },cargo: {
      type:DataTypes.JSONB,
      allowNull:false
    },
    phone: {
      type:DataTypes.JSONB,
      allowNull:false
    },
    photo: {
      type:DataTypes.STRING
    },
    digitalDoc: {
      type:DataTypes.STRING
    },
    observation: {
      type:DataTypes.TEXT
    },
    academic: {
      type:DataTypes.JSONB,
      allowNull:false
    },
    cursos: {
      type:DataTypes.JSONB
    },
    experience: {
      type:DataTypes.JSONB
    },
    contacto: {
      type:DataTypes.JSONB
    }
  }, {
    sequelize,
    modelName: 'employeeFile',
  });
  return employeeFile;
};