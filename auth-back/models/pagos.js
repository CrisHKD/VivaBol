const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pagos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    entrada_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'entradas',
        key: 'id'
      }
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha_pago: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pagos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "entrada_id",
        using: "BTREE",
        fields: [
          { name: "entrada_id" },
        ]
      },
    ]
  });
};
