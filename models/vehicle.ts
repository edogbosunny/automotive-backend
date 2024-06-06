import { Table, Column, Model, ForeignKey, BelongsTo, Index } from 'sequelize-typescript';
import { Dealership } from './dealership';

@Table
export class Vehicle extends Model {
  @Index
  @Column
  make!: string;  // Use definite assignment assertion

  @Index
  @Column
  model!: string;  // Use definite assignment assertion

  @Column
  year!: number;  // Use definite assignment assertion

  @Column
  price!: number;  // Use definite assignment assertion

  @Column
  vin!: string;  // Use definite assignment assertion

  @ForeignKey(() => Dealership)
  @Column
  dealershipId!: number;  // Use definite assignment assertion

  @BelongsTo(() => Dealership)
  dealership!: Dealership;  // Use definite assignment assertion
}
