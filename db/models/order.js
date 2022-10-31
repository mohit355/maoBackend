const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      models.Order.hasOne(models.User, { foreignKey: 'updatedBy' });
      models.Order.hasOne(models.User, { foreignKey: 'deletedBy' });
      models.Order.belongsTo(models.User, { foreignKey: 'userId' });
      models.Order.belongsTo(models.Address, { foreignKey: 'addressId'});

      // models.Order.hasMany(models.Product, { foreignKey: 'productId'});
    }
  }
  Order.init(
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
      productId: {
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
      },
      addressId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      discountId: {
        type: DataTypes.UUID,
        allowNull: true,

      },
      quantity: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        validate:{
          isIn: [['Order received', 'Preparing','Out for delivery','Delivered']],
        },
        defaultValue:"Order received"
      },
      modeOfPayment: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      deliveryTime: {
        type: DataTypes.DATE,
        required: false,
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
      modelName: 'Order',
      tableName: 'Orders',
    },
  );
  return Order;
};
