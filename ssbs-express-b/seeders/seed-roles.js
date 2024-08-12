'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        rolename: 'Admin',
        description: 'Administrator role',
        created_by: 'system',
        created_at: new Date(),
        modified_by: 'system',
        modified_at: new Date()
      },
      {
        rolename: 'User',
        description: 'Regular user role',
        created_by: 'system',
        created_at: new Date(),
        modified_by: 'system',
        modified_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
