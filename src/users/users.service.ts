import { Injectable, Inject } from '@nestjs/common';
import { IUser, PartialUser } from './interfaces/user.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userModel: typeof User,
  ) {}

  findOne(user: PartialUser): Promise<User | undefined> {
    return this.userModel.findOne({
      where: user,
    });
  }

  async createUser(createUserDto: IUser): Promise<User | undefined> {
    return this.userModel.create(createUserDto);
  }

  async remove(user: PartialUser): Promise<void> {
    const resUser = await this.findOne(user);
    await resUser.destroy();
  }
}
