/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Auto = sequelize.define(
    "autos",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      placa: {
        type: DataTypes.STRING(7),
        allowNull: false,
      },
      modelo: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      color: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      owner: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      porcentaje: {
        type: DataTypes.FLOAT(4),
        allowNull: true
      },
      status: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaulstValue: 1
      }
    },
    {
      tableName: "autos"
    }
  );

  return Auto;
};
