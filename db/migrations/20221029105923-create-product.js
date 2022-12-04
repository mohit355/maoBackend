'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products',  {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      
      productName: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      productHalfPrice: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      productFullPrice: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
      },
      productRating: {
        type: Sequelize.STRING,
        required: false,
        // allowNull: false
      },
       productImage: {
        type: Sequelize.STRING(500),
        required: false,
        // allowNull: false
      },
      productDesc: {
        type: Sequelize.STRING,
        required: false,
        // allowNull: false
      },
      productType: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      productCategory: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      createdAt: { type: Sequelize.DATE },
      updatedBy: { type: Sequelize.UUID },
      updatedAt: { type: Sequelize.DATE },
      deletedBy: { type: Sequelize.UUID },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};