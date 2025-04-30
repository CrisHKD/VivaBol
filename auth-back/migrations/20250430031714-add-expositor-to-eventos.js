'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Aquí agregamos la columna `expositor` a la tabla `eventos`.
     */
    await queryInterface.addColumn('eventos', 'expositor', {
      type: Sequelize.STRING(255),
      allowNull: true, // Puedes ajustarlo si no quieres que la columna sea nullable
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Aquí eliminamos la columna `expositor` si revertimos la migración.
     */
    await queryInterface.removeColumn('eventos', 'expositor');
  }
};
