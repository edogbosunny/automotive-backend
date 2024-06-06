import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from './customer';
import { Vehicle } from './vehicle';

@Table
export class Sale extends Model {
  @ForeignKey(() => Customer)
  @Column
  customerId!: number;  // Use definite assignment assertion

  @BelongsTo(() => Customer)
  customer!: Customer;  // Use definite assignment assertion

  @ForeignKey(() => Vehicle)
  @Column
  vehicleId!: number;  // Use definite assignment assertion

  @BelongsTo(() => Vehicle)
  vehicle!: Vehicle;  // Use definite assignment assertion

  @Column
  date!: Date;  // Use definite assignment assertion

  @Column
  price!: number;  // Use definite assignment assertion
}
