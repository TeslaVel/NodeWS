'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const comments = [
      {
        message: "Testing Comment One",
        comment_type: 1,
        user_id: 1,
        post_id: 1,
        seen: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: "Second Comment",
        comment_type: 1,
        user_id: 1,
        post_id: 1,
        seen: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: "This is the third Comment",
        comment_type: 1,
        user_id: 2,
        post_id: 1,
        seen: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: "Comment for post two",
        comment_type: 1,
        user_id: 1,
        post_id: 2,
        seen: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: "Comment for post two",
        comment_type: 1,
        user_id: 2,
        post_id: 2,
        seen: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        message: "Another Comment for post two",
        comment_type: 1,
        user_id: 2,
        post_id: 2,
        seen: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    await queryInterface.bulkInsert('comments', comments, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('comments', null, {});
  }
};
