"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm cột mới có kiểu INTEGER
    await queryInterface.addColumn("Products", "new_price", {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    // Cập nhật dữ liệu từ cột "price" cũ sang cột mới
    await queryInterface.sequelize.query(`
      UPDATE "Products" SET "new_price" = CAST("oldPrice" AS INTEGER)
    `);

    // Xóa cột "price" cũ
    await queryInterface.removeColumn("Products", "oldPrice");

    // Đổi tên cột mới thành "price" nếu muốn giữ tên cột như trước
    await queryInterface.renameColumn("Products", "new_price", "oldPrice");
  },

  down: async (queryInterface, Sequelize) => {
    // Thêm cột "price" với kiểu CHAR (nếu muốn phục hồi lại cấu trúc ban đầu)
    await queryInterface.addColumn("Products", "oldPrice", {
      type: Sequelize.STRING,
    });

    // Cập nhật dữ liệu từ cột mới sang cột "price" cũ
    await queryInterface.sequelize.query(`
      UPDATE "Products" SET "oldPrice" = "price"::TEXT
    `);

    // Xóa cột "price" mới
    await queryInterface.removeColumn("Products", "oldPrice");

    // Đổi tên cột mới thành "price" nếu muốn giữ tên cột như trước
    await queryInterface.renameColumn("Products", "new_price", "oldPrice");
  },
};
