'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_name: {
        type: Sequelize.TEXT
      },
      position: {
        type: Sequelize.TEXT
      },
      date_applied: {
        type: Sequelize.DATEONLY
      },
      range_max: {
        type: Sequelize.TEXT
      },
      range_min: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.TEXT
      },
      heard_back: {
        type: Sequelize.BOOLEAN
      },
      heard_back_date: {
        type: Sequelize.DATEONLY
      },
      heard_back_response: {
        type: Sequelize.TEXT
      },
      in_progress: {
        type: Sequelize.BOOLEAN
      },
      denied: {
        type: Sequelize.BOOLEAN
      },
      denied_response: {
        type: Sequelize.TEXT
      },
      company_summary: {
        type: Sequelize.TEXT
      },
      tasks: {
        type: Sequelize.TEXT
      },
      requirements: {
        type: Sequelize.TEXT
      },
      benefits: {
        type: Sequelize.TEXT
      },
      job_url: {
        type: Sequelize.TEXT
      },
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
    await queryInterface.dropTable('jobs');
  }
};
