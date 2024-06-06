import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from '../resolvers';

const typeDefs = `
  type Query {
    vehicles(make: String, model: String, year: Int, dealershipId: Int): [Vehicle]
    customers(lastName: String): [Customer]
    sales(customerId: Int, vehicleId: Int): [Sale]
    dealerships: [Dealership]
    dealership(id: Int!): Dealership
  }

  type Mutation {
    addVehicle(dealershipId: Int!, make: String!, model: String!, year: Int!, price: Float!, vin: String!): Vehicle
    updateVehicle(id: Int!, make: String, model: String, year: Int, price: Float, vin: String): Vehicle
    addCustomer(firstName: String!, lastName: String!, email: String!, phone: String!): Customer
    updateCustomer(id: Int!, firstName: String, lastName: String, email: String, phone: String): Customer
    recordSale(customerId: Int!, vehicleId: Int!, date: String!, price: Float!): Sale
    updateSale(id: Int!, customerId: Int, vehicleId: Int, date: String, price: Float): Sale
    addDealership(name: String!, apiKey: String!, parentId: Int): Dealership
    updateDealership(id: Int!, name: String, apiKey: String, parentId: Int): Dealership
    deleteDealership(id: Int!): Boolean
  }

  type Dealership {
    id: Int!
    name: String!
    parentId: Int
    vehicles: [Vehicle]
  }

  type Vehicle {
    id: Int!
    make: String!
    model: String!
    year: Int!
    price: Float!
    vin: String!
    dealership: Dealership!
  }

  type Customer {
    id: Int!
    firstName: String!
    lastName: String!
    email: String!
    phone: String!
    sales: [Sale]
  }

  type Sale {
    id: Int!
    customer: Customer!
    vehicle: Vehicle!
    date: String!
    price: Float!
  }
`;

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
