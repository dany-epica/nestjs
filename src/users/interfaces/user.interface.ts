import { User } from '../user.entity';

/** User object with at least 'id' or 'userName' */
export type PartialUser = Pick<User, 'id'> | Pick<User, 'userName'>;

export interface IUser {
  fullName: string;

  userName: string;

  email: string;

  password: string;
}
