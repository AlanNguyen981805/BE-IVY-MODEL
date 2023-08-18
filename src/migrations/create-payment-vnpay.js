"use strict";

const { UUID } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VnPay", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUID,
      },
      vnp_Amount: {
        type: Sequelize.STRING,
      },
      vnp_BankCode: {
        type: Sequelize.STRING,
      },
      vnp_CardType: {
        type: Sequelize.STRING,
      },
      vnp_OrderInfo: {
        type: Sequelize.STRING,
      },
      vnp_PayDate: {
        type: Sequelize.STRING,
      },
      vnp_ResponseCode: {
        type: Sequelize.STRING,
      },
      vnp_TmnCode: {
        type: Sequelize.STRING,
      },
      vnp_TransactionNo: {
        type: Sequelize.STRING,
      },
      vnp_TransactionStatus: {
        type: Sequelize.STRING,
      },
      vnp_TxnRef: {
        type: Sequelize.INTEGER,
      },
      vnp_SecureHash: {
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("VnPay");
  },
};
