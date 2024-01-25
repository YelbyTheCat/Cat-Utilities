import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const Job = sequelize.define('Job', {
  companyName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dateApplied: {
    type: DataTypes.DATE,
    allowNull: false
  },
  rangeMax: {
    type: DataTypes.TEXT
  },
  rangeMin: {
    type: DataTypes.TEXT
  },
  location: {
    type: DataTypes.TEXT
  },
  heardBack: {
    type: DataTypes.BOOLEAN
  },
  inProgress: {
    type: DataTypes.BOOLEAN
  },
  denied: {
    type: DataTypes.BOOLEAN
  },
  companySummary: {
    type: DataTypes.TEXT
  },
  tasks: {
    type: DataTypes.TEXT
  },
  requirements: {
    type: DataTypes.TEXT
  },
  benefits: {
    type: DataTypes.TEXT
  }
});
