const Sequelize = require('sequelize');
const config = require('../config');
const orderModel = require('./order');
const productModel = require('./product');
const addressModel = require('./address');
const userModel = require('./user');

const db = {};

const sequelize = new Sequelize(config);

const requireModel = (schema) => {
  const model = schema(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
};

requireModel(userModel);
requireModel(orderModel);
requireModel(productModel);
requireModel(addressModel);
// requireModel(contentModel);
// requireModel(userDemoPreferenceModel);
// requireModel(fieldModel);
// requireModel(logModel);
// requireModel(contentDataModel);
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
