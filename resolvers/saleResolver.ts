import { SaleService } from '../services/saleService';
import { Customer } from '../models/customer';
import { Vehicle } from '../models/vehicle';

export const saleResolver = {
  Query: {
    sales: async (_: any, args: any) => {
      return SaleService.getSales(args.customerId, args.vehicleId);
    },
  },
  Mutation: {
    recordSale: async (_: any, args: any) => {
      return SaleService.recordSale(args.customerId, args.vehicleId, args.date, args.price);
    },
    updateSale: async (_: any, args: any) => {
      return SaleService.updateSale(args.id, args.customerId, args.vehicleId, args.date, args.price);
    },
  },
  Sale: {
    customer: (sale: any) => {
      return Customer.findByPk(sale.customerId);
    },
    vehicle: (sale: any) => {
      return Vehicle.findByPk(sale.vehicleId);
    },
  },
};
