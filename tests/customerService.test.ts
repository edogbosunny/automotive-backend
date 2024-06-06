import { CustomerService } from '../services/customerService';
import { Customer } from '../models/customer';

jest.mock('../models/customer');

describe('CustomerService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get customers', async () => {
    const mockCustomers = [{ id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890' }];
    (Customer.findAll as jest.Mock).mockResolvedValue(mockCustomers);

    const customers = await CustomerService.getCustomers('Doe');
    expect(customers).toEqual(mockCustomers);
    expect(Customer.findAll).toHaveBeenCalledWith({ where: { lastName: 'Doe' } });
  });

  it('should add a customer', async () => {
    const mockCustomer = { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890' };
    (Customer.create as jest.Mock).mockResolvedValue(mockCustomer);

    const customer = await CustomerService.addCustomer('John', 'Doe', 'john.doe@example.com', '123-456-7890');
    expect(customer).toEqual(mockCustomer);
    expect(Customer.create).toHaveBeenCalledWith({ firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890' });
  });

  it('should update a customer', async () => {
    const mockCustomer = { id: 1, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone: '987-654-3210' };
    (Customer.update as jest.Mock).mockResolvedValue([1]);
    (Customer.findByPk as jest.Mock).mockResolvedValue(mockCustomer);

    const customer = await CustomerService.updateCustomer(1, 'Jane', 'Doe', 'jane.doe@example.com', '987-654-3210');
    expect(customer).toEqual(mockCustomer);
    expect(Customer.update).toHaveBeenCalledWith(
      { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone: '987-654-3210' },
      { where: { id: 1 } }
    );
    expect(Customer.findByPk).toHaveBeenCalledWith(1);
  });
});
