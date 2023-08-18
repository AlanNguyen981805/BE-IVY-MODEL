"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm cột mới có kiểu UUID và là khóa chính tạm thời
    await queryInterface.addColumn("ProductSize", "new_sku", {
      type: Sequelize.STRING,
      primaryKey: false,
      allowNull: true
    });

    // Cập nhật dữ liệu từ cột "sku" cũ sang cột mới
    await queryInterface.sequelize.query(`
      UPDATE "ProductSize" SET "new_sku" = "sku"
    `);

    // Xóa cột "sku" cũ
    await queryInterface.removeColumn("ProductSize", "sku");

    // Thêm cột "sku" mới có kiểu STRING và là khóa chính
    await queryInterface.addColumn("ProductSize", "sku", {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    });

    // Cập nhật dữ liệu từ cột mới sang cột "sku"
    await queryInterface.sequelize.query(`
      UPDATE "ProductSize" SET "sku" = "new_sku"
    `);

    // Xóa cột tạm thời "new_sku"
    await queryInterface.removeColumn("ProductSize", "new_sku");
  },

  down: async (queryInterface, Sequelize) => {
    // Thêm cột tạm thời "new_sku" với kiểu STRING và không là khóa chính
    await queryInterface.addColumn("ProductSize", "new_sku", {
      type: Sequelize.STRING,
      primaryKey: false,
      allowNull: true
    });

    // Cập nhật dữ liệu từ cột "sku" mới sang cột tạm thời "new_sku"
    await queryInterface.sequelize.query(`
      UPDATE "ProductSize" SET "new_sku" = "sku"
    `);

    // Xóa cột "sku" mới
    await queryInterface.removeColumn("ProductSize", "sku");

    // Thêm cột "sku" cũ với kiểu STRING và không là khóa chính
    await queryInterface.addColumn("ProductSize", "sku", {
      type: Sequelize.STRING,
      primaryKey: false,
      allowNull: true
    });

    // Cập nhật dữ liệu từ cột tạm thời "new_sku" sang cột "sku" cũ
    await queryInterface.sequelize.query(`
      UPDATE "ProductSize" SET "sku" = "new_sku"
    `);

    // Xóa cột tạm thời "new_sku"
    await queryInterface.removeColumn("ProductSize", "new_sku");
  },
};
