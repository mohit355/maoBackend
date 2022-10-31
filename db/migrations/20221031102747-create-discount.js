'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Discounts', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      discountType: {
        type: Sequelize.ENUM("Percentage","Flat/Absolute"),
        allowNull: false,
      },
      discountValue: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discountOnOrderAbove: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Discounts');
  }
};