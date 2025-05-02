const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  
  return sequelize.define('eventos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Debe ser mayor que cero"
    },
    expositor: {
      type: DataTypes.STRING(255),
      allowNull: true,  // Esto puede ser nulo, dependiendo de si el expositor está disponible
    },
    ubicacion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    departamento: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    coordenadas: {
      type: "POINT",
      allowNull: true
    },
    organizador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'organizadores',
        key: 'id'
      }
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categorias_eventos',
        key: 'id'
      }
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    estado_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'estados_evento',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'eventos',
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
        name: "estado_id",
        using: "BTREE",
        fields: [
          { name: "estado_id" },
        ]
      },
      {
        name: "categoria_id",
        using: "BTREE",
        fields: [
          { name: "categoria_id" },
        ]
      },
      {
        name: "organizador_id",
        using: "BTREE",
        fields: [
          { name: "organizador_id" },
        ]
      },
    ]
  });
};
