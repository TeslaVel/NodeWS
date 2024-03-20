'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const businesses = [
      {
        name: "Tu Empresa",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mattis lacus neque, sit amet aliquam leo vehicula at. Nullam nibh tellus, vestibulum eget accumsan ege",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Tu compañia",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mattis lacus neque, sit amet aliquam leo vehicula at. Nullam nibh tellus, vestibulum eget accumsan ege",
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    await queryInterface.bulkInsert('businesses', businesses, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('businesses', null, {});
  }
};
