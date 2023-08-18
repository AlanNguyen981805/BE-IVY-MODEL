"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Đổi tên cột "new_sku" thành "sku"
    await queryInterface.renameColumn("ProductSize", "new_sku", "sku");

    // Thêm khóa chính cho trường "sku"
    await queryInterface.changeColumn("ProductSize", "sku", {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Đổi tên cột "sku" thành "new_sku"
    await queryInterface.renameColumn("ProductSize", "sku", "new_sku");

    // Xóa khóa chính của trường "new_sku"
    await queryInterface.changeColumn("ProductSize", "new_sku", {
      type: Sequelize.STRING,
      primaryKey: false,
      allowNull: true
    });
  },
};
