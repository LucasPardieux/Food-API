const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    health_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stepByStep:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    RecipeDiet:{
      type: DataTypes.TEXT,
      allowNull: true
    }
  },{
    timestamps:false
  });
};
