"use strict";

const { UUIDV4, UUID } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUID,
      },
      userId: {
        type: Sequelize.STRING,
      },
      productId: {
        type: Sequelize.STRING,
      },
      transactionStatus: {
        type: Sequelize.INTEGER,
      },
      orderInfo: {
        type: Sequelize.STRING
      },
      paymentType: {
        type: Sequelize.STRING
      },
      transactionNo: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
