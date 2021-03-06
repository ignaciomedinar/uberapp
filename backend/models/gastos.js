/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Gasto = sequelize.define(
    "gastos",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      fecha: {
        type: DataTypes.STRING(7),
        allowNull: false,
      },
      concepto: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      monto: {
        type: DataTypes.FLOAT(10),
        allowNull: false
      },
      status: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: 1
      }
    },
    {
      tableName: "gasto"
    }
  );

  return Gasto;
};
