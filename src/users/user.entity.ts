import { Column, Model, Table, AllowNull } from 'sequelize-typescript';

@Table
export class User extends Model {
  @AllowNull(false)
  @Column
  fullName: string;

  @AllowNull(false)
  @Column
  userName: string;

  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;
}
