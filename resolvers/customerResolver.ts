import { CustomerService } from '../services/customerService';

export const customerResolver = {
  Query: {
    customers: async (_: any, args: any) => {
      return CustomerService.getCustomers(args.lastName);
    },
  },
  Mutation: {
    addCustomer: async (_: any, args: any) => {
      return CustomerService.addCustomer(args.firstName, args.lastName, args.email, args.phone);
    },
    updateCustomer: async (_: any, args: any) => {
      return CustomerService.updateCustomer(args.id, args.firstName, args.lastName, args.email, args.phone);
    },
  },
  Customer: {
    sales: (customer: any) => {
      return customer.getSales();
    },
  },
};
