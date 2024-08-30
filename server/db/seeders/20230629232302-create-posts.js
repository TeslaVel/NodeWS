'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const posts = [
      {
        body: "This is the first post",
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: "This is the second post",
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: "This is the third post",
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        body: "This is the fourth post",
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
    ];
    await queryInterface.bulkInsert('posts', posts, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('posts', null, {});
  }
};
