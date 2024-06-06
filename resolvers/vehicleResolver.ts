import { VehicleService } from '../services/vehicleService';
import { Dealership } from '../models/dealership';

export const vehicleResolver = {
  Query: {
    vehicles: async (_: any, args: any) => {
      return VehicleService.getVehicles(args.make, args.model, args.year, args.dealershipId);
    },
  },
  Mutation: {
    addVehicle: async (_: any, args: any) => {
      return VehicleService.addVehicle(args.dealershipId, args.make, args.model, args.year, args.price, args.vin);
    },
    updateVehicle: async (_: any, args: any) => {
      return VehicleService.updateVehicle(args.id, args.make, args.model, args.year, args.price, args.vin);
    },
  },
  Vehicle: {
    dealership: (vehicle: any) => {
      return Dealership.findByPk(vehicle.dealershipId);
    },
  },
};
