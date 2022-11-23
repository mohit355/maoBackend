const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      models.Address.hasOne(models.User, { foreignKey: 'updatedBy' });
      models.Address.hasOne(models.User, { foreignKey: 'deletedBy' });
      models.Address.hasOne(models.Order, { foreignKey: 'addressId' });
      models.Address.belongsTo(models.User, { foreignKey: 'userId', as: 'UserId' });
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      houseNo: {
        type: DataTypes.STRING,
        required: false,
        // allowNull: false,
      },
      area: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      pincode: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      addressType: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      receiverPhoneNumber: {
        type: DataTypes.STRING,
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
      modelName: 'Address',
      tableName: 'Addresses',
    },
  );
  return Address;
};