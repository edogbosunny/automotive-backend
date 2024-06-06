import { Sale } from '../models/sale';
import { Customer } from '../models/customer';
import { Vehicle } from '../models/vehicle';

export class SaleService {
  static async getSales(customerId?: number, vehicleId?: number) {
    const where: any = {};
    if (customerId) where.customerId = customerId;
    if (vehicleId) where.vehicleId = vehicleId;
    return Sale.findAll({ where });
  }

  static async recordSale(customerId: number, vehicleId: number, date: string, price: number) {
    return Sale.create({ customerId, vehicleId, date, price });
  }

  static async updateSale(id: number, customerId?: number, vehicleId?: number, date?: string, price?: number) {
    const updateData: any = {};
    if (customerId) updateData.customerId = customerId;
    if (vehicleId) updateData.vehicleId = vehicleId;
    if (date) updateData.date = date;
    if (price) updateData.price = price;
    await Sale.update(updateData, { where: { id } });
    return Sale.findByPk(id);
  }
}
