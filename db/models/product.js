const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      models.Product.hasOne(models.User, { foreignKey: 'updatedBy' });
      models.Product.hasOne(models.User, { foreignKey: 'deletedBy' });

    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      
      productName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
      },
      productHalfPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      productFullPrice: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false,
      },
      productRating: {
        type: DataTypes.STRING,
        required: false,
        // allowNull: false
      },
       productImage: {
        type: DataTypes.STRING,
        required: false,
        // allowNull: false
      },
      productDesc: {
        type: DataTypes.STRING,
        required: false,
        // allowNull: false
      },
      productType: {
        type: DataTypes.ENUM('veg', 'non-veg','All'),
        required: true,
        allowNull: false,
        defaultValue:'All'
      },
      productCategory: {
        type: DataTypes.STRING,
        required: true,
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
      modelName: 'Product',
      tableName: 'Products',
    },
  );
  return Product;
};