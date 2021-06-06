import {
  Column,
  Model,
  Table,
  AllowNull,
  HasMany,
  Unique,
} from 'sequelize-typescript';
import { Post } from 'src/posts/entities/post.entity';

@Table
export class User extends Model {
  @AllowNull(false)
  @Column
  fullName: string;

  @Unique
  @AllowNull(false)
  @Column
  userName: string;

  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @HasMany(() => Post)
  posts: Post[];
}
