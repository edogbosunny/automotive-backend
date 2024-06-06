import { Vehicle } from '../models/vehicle';
import { Dealership } from '../models/dealership';

export class VehicleService {
  static async getVehicles(make?: string, model?: string, year?: number, dealershipId?: number) {
    const where: any = {};
    if (make) where.make = make;
    if (model) where.model = model;
    if (year) where.year = year;
    if (dealershipId) where.dealershipId = dealershipId;
    return Vehicle.findAll({ where });
  }

  static async addVehicle(dealershipId: number, make: string, model: string, year: number, price: number, vin: string) {
    return Vehicle.create({ dealershipId, make, model, year, price, vin });
  }

  static async updateVehicle(id: number, make?: string, model?: string, year?: number, price?: number, vin?: string) {
    const updateData: any = {};
    if (make) updateData.make = make;
    if (model) updateData.model = model;
    if (year) updateData.year = year;
    if (price) updateData.price = price;
    if (vin) updateData.vin = vin;
    await Vehicle.update(updateData, { where: { id } });
    return Vehicle.findByPk(id);
  }
}
