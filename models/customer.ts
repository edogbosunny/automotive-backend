import { Table, Column, Model, HasMany, Index } from 'sequelize-typescript';
import { Sale } from './sale';

@Table
export class Customer extends Model {
  @Column
  firstName!: string;  // Use definite assignment assertion

  @Index
  @Column
  lastName!: string;  // Use definite assignment assertion

  @Column
  email!: string;  // Use definite assignment assertion

  @Column
  phone!: string;  // Use definite assignment assertion

  @HasMany(() => Sale)
  sales?: Sale[];  // Optional field, so no need for definite assignment
}
