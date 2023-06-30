"use strict";

const { UUIDV4, UUID } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUID
      },
      title: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      cateId: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      oldPrice: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
      intro: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      preserve: {
        type: Sequelize.STRING,
      },
      star: {
        type: Sequelize.INTEGER,
      },
      sku: {
        type: Sequelize.STRING,
      },
      isNew: Sequelize.BOOLEAN,
      isBestSeller: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Products");
  },
};
