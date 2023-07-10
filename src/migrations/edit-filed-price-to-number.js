"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm cột mới có kiểu INTEGER
    await queryInterface.addColumn("Products", "new_price", {
      type: Sequelize.INTEGER,
    });

    // Cập nhật dữ liệu từ cột "price" cũ sang cột mới
    await queryInterface.sequelize.query(`
      UPDATE "Products" SET "new_price" = CAST("price" AS INTEGER)
    `);

    // Xóa cột "price" cũ
    await queryInterface.removeColumn("Products", "price");

    // Đổi tên cột mới thành "price" nếu muốn giữ tên cột như trước
    await queryInterface.renameColumn("Products", "new_price", "price");
  },

  down: async (queryInterface, Sequelize) => {
    // Thêm cột "price" với kiểu CHAR (nếu muốn phục hồi lại cấu trúc ban đầu)
    await queryInterface.addColumn("Products", "new_price", {
      type: Sequelize.STRING,
    });

    // Cập nhật dữ liệu từ cột mới sang cột "price" cũ
    await queryInterface.sequelize.query(`
      UPDATE "Products" SET "new_price" = "price"::TEXT
    `);

    // Xóa cột "price" mới
    await queryInterface.removeColumn("Products", "price");

    // Đổi tên cột mới thành "price" nếu muốn giữ tên cột như trước
    await queryInterface.renameColumn("Products", "new_price", "price");
  },
};
