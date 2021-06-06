import { Injectable, Inject } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userModel: typeof User,
  ) {}

  findOne(id: string): Promise<User | undefined> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async createUser(user: IUser): Promise<User | undefined> {
    return this.userModel.create(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
