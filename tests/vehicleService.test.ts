import { VehicleService } from '../services/vehicleService';
import { Vehicle } from '../models/vehicle';

jest.mock('../models/vehicle');

describe('VehicleService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get vehicles', async () => {
    const mockVehicles = [{ id: 1, make: 'Toyota', model: 'Camry', year: 2021, price: 25000, vin: 'VIN12345' }];
    (Vehicle.findAll as jest.Mock).mockResolvedValue(mockVehicles);

    const vehicles = await VehicleService.getVehicles('Toyota');
    expect(vehicles).toEqual(mockVehicles);
    expect(Vehicle.findAll).toHaveBeenCalledWith({ where: { make: 'Toyota' } });
  });

  it('should add a vehicle', async () => {
    const mockVehicle = { id: 1, make: 'Toyota', model: 'Camry', year: 2021, price: 25000, vin: 'VIN12345', dealershipId: 1 };
    (Vehicle.create as jest.Mock).mockResolvedValue(mockVehicle);

    const vehicle = await VehicleService.addVehicle(1, 'Toyota', 'Camry', 2021, 25000, 'VIN12345');
    expect(vehicle).toEqual(mockVehicle);
    expect(Vehicle.create).toHaveBeenCalledWith({ dealershipId: 1, make: 'Toyota', model: 'Camry', year: 2021, price: 25000, vin: 'VIN12345' });
  });

  it('should update a vehicle', async () => {
    const mockVehicle = { id: 1, make: 'Toyota', model: 'Camry', year: 2021, price: 25000, vin: 'VIN12345' };
    (Vehicle.update as jest.Mock).mockResolvedValue([1]);
    (Vehicle.findByPk as jest.Mock).mockResolvedValue(mockVehicle);

    const vehicle = await VehicleService.updateVehicle(1, 'Toyota', 'Camry', 2021, 25000, 'VIN12345');
    expect(vehicle).toEqual(mockVehicle);
    expect(Vehicle.update).toHaveBeenCalledWith(
      { make: 'Toyota', model: 'Camry', year: 2021, price: 25000, vin: 'VIN12345' },
      { where: { id: 1 } }
    );
    expect(Vehicle.findByPk).toHaveBeenCalledWith(1);
  });
});
