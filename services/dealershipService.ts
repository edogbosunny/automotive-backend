import { Dealership } from '../models/dealership';

export class DealershipService {
  static async getDealerships() {
    return Dealership.findAll();
  }

  static async getDealershipById(id: number) {
    return Dealership.findByPk(id);
  }

  static async addDealership(name: string, apiKey: string, parentId?: number) {
    return Dealership.create({ name, apiKey, parentId });
  }

  static async updateDealership(id: number, name?: string, apiKey?: string, parentId?: number) {
    const updateData: any = {};
    if (name) updateData.name = name;
    if (apiKey) updateData.apiKey = apiKey;
    if (parentId) updateData.parentId = parentId;
    await Dealership.update(updateData, { where: { id } });
    return Dealership.findByPk(id);
  }

  static async deleteDealership(id: number) {
    return Dealership.destroy({ where: { id } });
  }
}
