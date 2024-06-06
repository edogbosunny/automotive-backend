import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { Vehicle } from './vehicle';

@Table
export class Dealership extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  apiKey!: string;

  @ForeignKey(() => Dealership)
  @Column
  parentId?: number;

  @HasMany(() => Vehicle)
  vehicles!: Vehicle[];
}
