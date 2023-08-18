'use strict';

const { UUID } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductSize', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUID
      },
      sizeId: {
        type: Sequelize.UUID
      },
      // sku: {
      //   type: Sequelize.STRING,
      //   primaryKey: true,
      //   unique: true,
      //   autoIncrement: false,
      // },
      productId: {
        type: Sequelize.UUID,
      },
      colorId: {
        type: Sequelize.UUID,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductSize');
  }
};