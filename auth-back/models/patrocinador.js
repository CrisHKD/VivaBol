
module.exports = (sequelize, DataTypes) => {
    const Patrocinador = sequelize.define('patrocinadores', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      logo_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      
    },{
        tableName: 'patrocinadores',
        timestamps: false,  // Deshabilita la creación de los campos `createdAt` y `updatedAt`
      }
);
  
    // Relación muchos a muchos con eventos
    Patrocinador.associate = (models) => {
        // Aquí se asegura de que el modelo `Evento` esté en `models`
        Patrocinador.belongsToMany(models.Evento, {
          through: 'Patrocinador_Evento',
          foreignKey: 'patrocinador_id',
        });
      };
  
    return Patrocinador;
  };
  