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
      productPrice: {
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
        type: Sequelize.STRING,
        required: false,
        // allowNull: false
      },
      productDesc: {
        type: Sequelize.STRING,
        required: false,
        // allowNull: false
      },
      productType: {
        type: Sequelize.ENUM('Veg', 'Non veg','All'),
        required: true,
        allowNull: false,
        defaultValue:'All'
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