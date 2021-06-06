import {
  Column,
  Model,
  Table,
  AllowNull,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
export class Post extends Model {
  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  content: string;

  @AllowNull(false)
  @Column
  status: 'Published' | 'Drafted' | 'WaitingForReview';

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
