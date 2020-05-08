/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Chofer = sequelize.define(
    "choferes",
    {
      id_chofer: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      id_auto: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: "autos",
          key: "id"
        }
      },
      nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      celular: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      clabe: {
        type: DataTypes.INTEGER(30),
        allowNull: true
      },
      status: {
        type: DataTypes.BOOLEAN(),
        allowNull: false,
        defaultValue: 1
      }
    },
    {
      tableName: "choferes"
    }
  );

  return Chofer;
};
