/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Ingreso = sequelize.define(
    "ingresos",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_chofer: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
      id_gasto: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
      },
      uber: {
        type: DataTypes.FLOAT(30),
        allowNull: false,
      },
      didi: {
        type: DataTypes.FLOAT(30),
        allowNull: false,
      },
      renta: {
        type: DataTypes.FLOAT(30),
        allowNull: false,
      },
      paraChofer: {
        type: DataTypes.FLOAT(30),
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE(6),
        allowNull: false,
      },
      semana: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      utilidad: {
        type: DataTypes.FLOAT(30),
        allowNull: false,
      },
    },
    {
      tableName: "ingresos",
    }
  );

  return Ingreso;
};
