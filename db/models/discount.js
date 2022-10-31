const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    static associate(models) {
      models.Discount.hasOne(models.User, { foreignKey: 'updatedBy' });
      models.Discount.hasOne(models.User, { foreignKey: 'deletedBy' });

      // models.Discount.hasMany(models.Product, { foreignKey: 'productId'});
    }
  }
  Discount.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      discountType: {
        type: DataTypes.ENUM("Percentage","Flat/Absolute"),
        allowNull: false,
      },
      discountValue: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discountOnOrderAbove: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: 'Discount',
      tableName: 'Discounts',
    },
  );
  return Discount;
};

