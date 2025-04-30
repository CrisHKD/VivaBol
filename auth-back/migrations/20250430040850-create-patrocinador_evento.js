'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Creación de la tabla `Patrocinador_Evento` con las claves foráneas `evento_id` y `patrocinador_id`.
     */
    await queryInterface.createTable('Patrocinador_Evento', {
      evento_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'eventos',  // Nombre de la tabla referenciada
          key: 'id',         // La clave primaria en la tabla `eventos`
        },
        onDelete: 'CASCADE', // Si un evento se elimina, se eliminan las relaciones
      },
      patrocinador_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'patrocinadores',  // Nombre de la tabla referenciada
          key: 'id',                // La clave primaria en la tabla `patrocinadores`
        },
        onDelete: 'CASCADE',  // Si un patrocinador se elimina, se eliminan las relaciones
      },
    },
  );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Eliminación de la tabla `Patrocinador_Evento` si revertimos la migración.
     */
    await queryInterface.dropTable('Patrocinador_Evento');
  }
};