import { Inject, Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject('POST_REPOSITORY')
    private postModel: typeof Post,
  ) {}
  create(createPostDto: any) {
    createPostDto.status = 'Drafted';
    return this.postModel.create(createPostDto);
  }

  findMany(
    startIndex: number,
    userId: number | undefined,
    orderBy: string,
    orderAsc: boolean,
  ) {
    const step = 10;
    const where = userId ? { userId } : {};
    return this.postModel.findAll({
      where,
      order: [[orderBy, orderAsc ? 'ASC' : 'DESC']],
      offset: startIndex,
      limit: startIndex + step,
    });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.update(updatePostDto, { where: { id } });
  }

  remove(id: number, userId: number) {
    return this.postModel.destroy({
      where: {
        id,
        userId,
      },
    });
  }
}
