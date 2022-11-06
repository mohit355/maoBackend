module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID, primaryKey: true, allowNull: false, defaultValue: Sequelize.UUIDV4,
      },
       name: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      phoneNumber: { type: Sequelize.STRING, allowNull: false, required: true,validate:{
        isNumeric: true,len: [10,10],
      }},
       password: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
      salt: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false
      },
       isAdmin:{
        type: Sequelize.ENUM('0', '1'),
        allowNull: false,
        defaultValue:"0"
      },
      createdAt: { type: Sequelize.DATE },
      updatedBy: { type: Sequelize.UUID },
      updatedAt: { type: Sequelize.DATE },
      deletedBy: { type: Sequelize.UUID },
      deletedAt: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
