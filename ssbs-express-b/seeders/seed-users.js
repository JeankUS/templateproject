'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [
      {
        fullname: 'John Doe',
        email: 'john.doe@example.com',
        mobile: '12345678',
        created_by: 'system',
        created_at: new Date(),
        modified_by: 'system',
        modified_at: new Date()
      },
      {
        fullname: 'Jane Smith',
        email: 'jane.smith@example.com',
        mobile: '98765432',
        created_by: 'system',
        created_at: new Date(),
        modified_by: 'system',
        modified_at: new Date()
      },
      {
        fullname: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        mobile: '55555555',
        created_by: 'system',
        created_at: new Date(),
        modified_by: 'system',
        modified_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
