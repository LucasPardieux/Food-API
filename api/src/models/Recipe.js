const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    analyzedInstructions:{
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
      allowNull: true,
    },
    RecipeDiet:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    image:{
      type: DataTypes.TEXT,
      allowNull: true
    }
  },{
    timestamps:false
  });
};
