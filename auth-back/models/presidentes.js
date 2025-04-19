const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('presidentes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    periodo_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    periodo_fin: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    partido_politico: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    biografia: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    creado_por: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'presidentes',
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
        name: "creado_por",
        using: "BTREE",
        fields: [
          { name: "creado_por" },
        ]
      },
    ]
  });
};
