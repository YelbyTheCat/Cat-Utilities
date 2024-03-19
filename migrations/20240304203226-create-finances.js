'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('finances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: Sequelize.TEXT,
      transaction_type: {
        type: Sequelize.ENUM('Debit', 'Credit'),
        allowNull: false
      },
      name: {
        allowNull: false,
        type: Sequelize.DATE
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      details: Sequelize.JSON,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('finances');
  }
};
