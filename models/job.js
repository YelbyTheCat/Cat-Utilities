module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    companyName: {
      type: DataTypes.TEXT
    },
    position: {
      type: DataTypes.TEXT
    },
    dateApplied: {
      type: DataTypes.DATEONLY
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
    heardBackDate: {
      type: DataTypes.DATEONLY
    },
    heardBackResponse: {
      type: DataTypes.TEXT
    },
    inProgress: {
      type: DataTypes.BOOLEAN
    },
    denied: {
      type: DataTypes.BOOLEAN
    },
    deniedResponse: {
      type: DataTypes.TEXT
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
    },
    jobUrl: {
      type: DataTypes.TEXT
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'jobs'
  });

  return Job;
};
