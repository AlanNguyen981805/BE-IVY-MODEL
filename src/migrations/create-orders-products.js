"use strict";

const { UUIDV4, UUID } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("OrderProducts", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUID,
      },
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      productSku: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
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
    await queryInterface.dropTable("OrderProducts");
  },
};
