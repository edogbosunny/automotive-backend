import { SaleService } from '../services/saleService';
import { Sale } from '../models/sale';

jest.mock('../models/sale');

describe('SaleService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get sales', async () => {
    const mockSales = [{ id: 1, customerId: 1, vehicleId: 1, date: '2023-06-01', price: 25000 }];
    (Sale.findAll as jest.Mock).mockResolvedValue(mockSales);

    const sales = await SaleService.getSales(1);
    expect(sales).toEqual(mockSales);
    expect(Sale.findAll).toHaveBeenCalledWith({ where: { customerId: 1 } });
  });

  it('should record a sale', async () => {
    const mockSale = { id: 1, customerId: 1, vehicleId: 1, date: '2023-06-01', price: 25000 };
    (Sale.create as jest.Mock).mockResolvedValue(mockSale);

    const sale = await SaleService.recordSale(1, 1, '2023-06-01', 25000);
    expect(sale).toEqual(mockSale);
    expect(Sale.create).toHaveBeenCalledWith({ customerId: 1, vehicleId: 1, date: '2023-06-01', price: 25000 });
  });

  it('should update a sale', async () => {
    const mockSale = { id: 1, customerId: 1, vehicleId: 1, date: '2023-06-02', price: 26000 };
    (Sale.update as jest.Mock).mockResolvedValue([1]);
    (Sale.findByPk as jest.Mock).mockResolvedValue(mockSale);

    const sale = await SaleService.updateSale(1, 1, 1, '2023-06-02', 26000);
    expect(sale).toEqual(mockSale);
    expect(Sale.update).toHaveBeenCalledWith(
      { customerId: 1, vehicleId: 1, date: '2023-06-02', price: 26000 },
      { where: { id: 1 } }
    );
    expect(Sale.findByPk).toHaveBeenCalledWith(1);
  });
});
