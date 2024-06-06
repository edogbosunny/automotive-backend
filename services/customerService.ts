import { Customer } from '../models/customer';

export class CustomerService {
  static async getCustomers(lastName?: string) {
    const where: any = {};
    if (lastName) where.lastName = lastName;
    return Customer.findAll({ where });
  }

  static async addCustomer(firstName: string, lastName: string, email: string, phone: string) {
    return Customer.create({ firstName, lastName, email, phone });
  }

  static async updateCustomer(id: number, firstName?: string, lastName?: string, email?: string, phone?: string) {
    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    await Customer.update(updateData, { where: { id } });
    return Customer.findByPk(id);
  }
}
