require('dotenv').config();

const common = {
  dialect: 'postgres',
  define: {
    underscored: true
  }
};

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD || '',
    database: process.env.PG_DEV_DB_NAME || 'cat_utilities_dev',
    host: '127.0.0.1',
    port: 5432,
    ...common
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    // host: 127.0.0.1,
    ...common
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    // host: 127.0.0.1,
    ...common
  }
};
