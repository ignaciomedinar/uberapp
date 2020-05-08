/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Ingreso = sequelize.define(
    "ingresos",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      id_chofer: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: "choferes",
          key: "id_chofer"
        }
      },
      id_gasto: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: "gastos",
          key: "id"
        }
      },
      uber: {
        type: DataTypes.FLOAT(30),
        allowNull: false
      },
      didi: {
        type: DataTypes.FLOAT(30),
        allowNull: false
      },
      renta: {
        type: DataTypes.FLOAT(30),
        allowNull: false
      },
      fecha: {
        type: DataTypes.INTEGER(30),
        allowNull: false
      },
      semana: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      debe: {
        type: DataTypes.FLOAT(30),
        allowNull: false
      },
      utilidad: {
        type: DataTypes.FLOAT(30),
        allowNull: false
      },
    },
    {
      tableName: "ingresos"
    }
  );

  return Ingreso;
};
