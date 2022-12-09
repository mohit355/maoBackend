const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      models.Order.hasOne(models.User, { foreignKey: "updatedBy" });
      models.Order.hasOne(models.User, { foreignKey: "deletedBy" });
      models.Order.belongsTo(models.User, { foreignKey: "userId" });
      models.Order.belongsTo(models.Address, { foreignKey: "addressId" });
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
      orderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      product: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      totalPayableAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalDiscountedAmount: {
        type: DataTypes.INTEGER,
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
      status: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        validate: {
          isIn: [
            ["Order received", "Preparing", "Out for delivery", "Delivered"],
          ],
        },
        defaultValue: "Order received",
      },
      modeOfPayment: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      outletName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      suggestion: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: "Order",
      tableName: "Orders",
    }
  );
  return Order;
};
