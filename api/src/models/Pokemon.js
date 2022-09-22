const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hp: {
        type: DataTypes.INTEGER,
        defaultValue: 20,
      },
      attack: {
        type: DataTypes.INTEGER,
        defaultValue: 20,
      },
      defense: {
        type: DataTypes.INTEGER,
        defaultValue: 20,
      },
      speed: {
        type: DataTypes.INTEGER,
        defaultValue: 20,
      },
      height: {
        type: DataTypes.INTEGER,
        defaultValue: 20,
      },
      weight: {
        type: DataTypes.INTEGER,
        defaultValue: 20,
      },
      img: {
        type: DataTypes.STRING,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
