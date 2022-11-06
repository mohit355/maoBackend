const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasOne(models.User, { foreignKey: 'updatedBy' });
      models.User.hasOne(models.Order, { foreignKey: 'userId' });
      models.User.hasMany(models.Address, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      phoneNumber: { type: DataTypes.STRING, allowNull: false, required: true, validate:{
        isNumeric: {args:true,msg: "Must be a valid mobile number"},len: [10,10],
      }},
      password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      salt: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      isAdmin:{
        type: DataTypes.ENUM('0', '1'),
        allowNull: false,
        defaultValue:"0"
      },
      createdAt: { type: DataTypes.DATE },
      updatedBy: { type: DataTypes.UUID },
      updatedAt: { type: DataTypes.DATE },
      deletedBy: { type: DataTypes.UUID },
      deletedAt: { type: DataTypes.DATE },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      modelName: 'User',
      tableName: 'Users',
    },
  );
  return User;
};
