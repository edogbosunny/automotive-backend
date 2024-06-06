'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      // Insert parent dealership
      const [mainDealership] = await queryInterface.bulkInsert(
        'Dealerships',
        [
          { name: 'Main Dealership', apiKey: 'main-api-key', createdAt: new Date(), updatedAt: new Date() },
        ],
        { returning: true, transaction }
      );

      // Insert child dealership using the ID of the parent dealership
      const [secondaryDealership] = await queryInterface.bulkInsert(
        'Dealerships',
        [
          { name: 'Secondary Dealership', apiKey: 'secondary-api-key', parentId: mainDealership.id, createdAt: new Date(), updatedAt: new Date() },
        ],
        { returning: true, transaction }
      );

      // Insert vehicles
      const [vehicle1, vehicle2] = await queryInterface.bulkInsert(
        'Vehicles',
        [
          { dealershipId: mainDealership.id, make: 'Toyota', model: 'Camry', year: 2021, price: 25000, vin: 'VIN12345', createdAt: new Date(), updatedAt: new Date() },
          { dealershipId: secondaryDealership.id, make: 'Honda', model: 'Civic', year: 2022, price: 22000, vin: 'VIN67890', createdAt: new Date(), updatedAt: new Date() },
        ],
        { returning: true, transaction }
      );

      // Insert customers
      const [johnDoe, janeSmith] = await queryInterface.bulkInsert(
        'Customers',
        [
          { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', createdAt: new Date(), updatedAt: new Date() },
          { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', createdAt: new Date(), updatedAt: new Date() },
        ],
        { returning: true, transaction }
      );

      // Insert sales
      await queryInterface.bulkInsert(
        'Sales',
        [
          { customerId: johnDoe.id, vehicleId: vehicle1.id, date: new Date(), price: 25000, createdAt: new Date(), updatedAt: new Date() },
          { customerId: janeSmith.id, vehicleId: vehicle2.id, date: new Date(), price: 22000, createdAt: new Date(), updatedAt: new Date() },
        ],
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('Sales', null, { transaction });
      await queryInterface.bulkDelete('Customers', null, { transaction });
      await queryInterface.bulkDelete('Vehicles', null, { transaction });
      await queryInterface.bulkDelete('Dealerships', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
