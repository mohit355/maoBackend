module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
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
      houseNo: {
        type: Sequelize.STRING,
        required: false,
        // allowNull: false,
      },
      area: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      pincode: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      addressType: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      receiverPhoneNumber: {
        type: Sequelize.STRING,
      },
      createdAt: { type: Sequelize.DATE },
      updatedBy: { type: Sequelize.UUID },
      updatedAt: { type: Sequelize.DATE },
      deletedBy: { type: Sequelize.UUID },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};