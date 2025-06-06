'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('eventos', 'fecha_fin', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('eventos', 'fecha_fin', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  }
};
