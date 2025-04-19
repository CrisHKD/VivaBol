const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombres: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    apellidos: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha_nac: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    genero: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pais: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    foto_perfil: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha_registro: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    verificado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuarios',
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
        name: "rol_id",
        using: "BTREE",
        fields: [
          { name: "rol_id" },
        ]
      },
    ]
  });
};
