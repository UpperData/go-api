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
    fisrtName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    documentId: DataTypes.STRING,
    nationality: DataTypes.BOOLEAN,
    address: DataTypes.JSONB,
    email: DataTypes.STRING,
    cargoId: DataTypes.INTEGER,
    departamentId: DataTypes.INTEGER,
    phone: DataTypes.JSONB,
    photo: DataTypes.STRING,
    digitalDoc: DataTypes.STRING,
    onservation: DataTypes.TEXT,
    academic: DataTypes.JSONB,
    cursos: DataTypes.JSONB,
    experience: DataTypes.JSONB,
    contacto: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'employeeFile',
  });
  return employeeFile;
};