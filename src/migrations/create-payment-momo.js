"use strict";

const { UUIDV4, UUID } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MoMo", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUID
      },
      partnerCode: {
        type: Sequelize.STRING,
      },
      orderId: {
        type: Sequelize.STRING,
      },
      requestId: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.STRING,
      },
      orderInfo: {
        type: Sequelize.STRING,
      },
      orderType: {
        type: Sequelize.STRING,
      },
      transId: {
        type: Sequelize.STRING,
      },
      resultCode: {
        type: Sequelize.STRING,
      },
      payType: {
        type: Sequelize.STRING,
      },
      responseTime: {
        type: Sequelize.INTEGER,
      },
      extraData: {
        type: Sequelize.STRING,
      },
      signature: Sequelize.STRING,
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("MoMo");
  },
};
