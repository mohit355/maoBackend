module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      productId: {
        type: Sequelize.ARRAY(Sequelize.UUID),
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
      quantity: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        validate:{
          isIn: [['Order received', 'Preparing','Out for delivery','Delivered']],
        },
        defaultValue:"Order received"
      },
      modeOfPayment: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
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
    await queryInterface.dropTable('Orders');
  },
};
