const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('organizadores', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      unique: "organizadores_ibfk_1"
    },
    nombre_institucion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sitio_web: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    telefono_contacto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    creado_en: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'organizadores',
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
        name: "usuario_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usuario_id" },
        ]
      },
    ]
  });
};
