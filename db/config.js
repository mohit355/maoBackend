require('../helpers/init-env')();

const {
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DB_NAME,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DIALECT,
} = process.env;

module.exports = {
  username: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB_NAME,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  dialect: POSTGRES_DIALECT,
  dialectOptions: { bigNumberStrings: true },
};
