module.exports = (sequelize, DataTypes) => {
  const Finance = sequelize.define('Finance', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    amount: DataTypes.TEXT,
    transaction_type: {
      type: DataTypes.ENUM('Debit', 'Credit'),
      allowNull: false
    },
    name: {
      allowNull: false,
      type: DataTypes.DATE
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE
    },
    details: DataTypes.JSON,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'finances'
  });

  return Finance;
};
