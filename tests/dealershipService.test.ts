import { DealershipService } from '../services/dealershipService';
import { Dealership } from '../models/dealership';

jest.mock('../models/dealership');

describe('DealershipService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get all dealerships', async () => {
    const mockDealerships = [{ id: 1, name: 'Dealership 1', apiKey: 'apikey1' }];
    (Dealership.findAll as jest.Mock).mockResolvedValue(mockDealerships);

    const dealerships = await DealershipService.getDealerships();
    expect(dealerships).toEqual(mockDealerships);
    expect(Dealership.findAll).toHaveBeenCalled();
  });

  it('should get a dealership by ID', async () => {
    const mockDealership = { id: 1, name: 'Dealership 1', apiKey: 'apikey1' };
    (Dealership.findByPk as jest.Mock).mockResolvedValue(mockDealership);

    const dealership = await DealershipService.getDealershipById(1);
    expect(dealership).toEqual(mockDealership);
    expect(Dealership.findByPk).toHaveBeenCalledWith(1);
  });

  it('should add a new dealership', async () => {
    const mockDealership = { id: 1, name: 'Dealership 1', apiKey: 'apikey1', parentId: null };
    (Dealership.create as jest.Mock).mockResolvedValue(mockDealership);

    const dealership = await DealershipService.addDealership('Dealership 1', 'apikey1');
    expect(dealership).toEqual(mockDealership);
    expect(Dealership.create).toHaveBeenCalledWith({ name: 'Dealership 1', apiKey: 'apikey1', parentId: undefined });
  });

  it('should update a dealership', async () => {
    const mockDealership = { id: 1, name: 'Updated Dealership', apiKey: 'apikey1', parentId: null };
    (Dealership.update as jest.Mock).mockResolvedValue([1]);
    (Dealership.findByPk as jest.Mock).mockResolvedValue(mockDealership);

    const dealership = await DealershipService.updateDealership(1, 'Updated Dealership', 'apikey1');
    expect(dealership).toEqual(mockDealership);
    expect(Dealership.update).toHaveBeenCalledWith(
      { name: 'Updated Dealership', apiKey: 'apikey1', parentId: undefined },
      { where: { id: 1 } }
    );
    expect(Dealership.findByPk).toHaveBeenCalledWith(1);
  });

  it('should delete a dealership', async () => {
    (Dealership.destroy as jest.Mock).mockResolvedValue(1);

    const result = await DealershipService.deleteDealership(1);
    expect(result).toBe(1);
    expect(Dealership.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
