// models/Patrocinador_Evento.js
module.exports = (sequelize, DataTypes) => {
  const Patrocinador_Evento = sequelize.define('Patrocinador_Evento', {
    evento_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'eventos',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    patrocinador_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'patrocinadores',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },{
    tableName: 'patrocinador_evento',
    timestamps: false,  // Deshabilita la creación de los campos `createdAt` y `updatedAt`
  });

  return Patrocinador_Evento;
};
