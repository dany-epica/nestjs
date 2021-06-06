import { PostStatusEnum } from '../interfaces/post.interface';

export class UpdatePostDto {
  // Not sure if this should be updated
  title: string;

  content: string;

  status: PostStatusEnum;
}
