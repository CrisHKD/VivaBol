'use strict';

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Comando para crear la tabla `patrocinadores` con las columnas `id`, `nombre`, y `logo_url`.
     */
    await queryInterface.createTable('patrocinadores', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Esto asegura que el `id` sea autoincremental
      },
      nombre: {
        type: Sequelize.STRING(255),
        allowNull: false,  // Nombre obligatorio
      },
      logo_url: {
        type: Sequelize.STRING(255),
        allowNull: true,  // Logo es opcional
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Comando para eliminar la tabla `patrocinadores` si revertimos la migración.
     */
    await queryInterface.dropTable('patrocinadores');
  }
};