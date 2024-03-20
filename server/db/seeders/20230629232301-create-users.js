'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const bcrypt = require('bcrypt')
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('123456789', saltRounds);

    const users = [
      {
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@example.com",
        username: 'Johndu',
        password_digest: hashedPassword,
        business_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: "Milo",
        last_name: "Smith",
        email: "milsmith@example.com",
        username: 'Milsmith',
        password_digest: hashedPassword,
        business_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
