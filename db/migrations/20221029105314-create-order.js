module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      product: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      totalPayableAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalDiscountedAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      addressId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      discountId: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      outletName: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      suggestion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      deliveryTime: {
        type: Sequelize.DATE,
        required: false,
      },
      createdAt: { type: Sequelize.DATE },
      updatedBy: { type: Sequelize.UUID },
      updatedAt: { type: Sequelize.DATE },
      deletedBy: { type: Sequelize.UUID },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Orders");
  },
};
