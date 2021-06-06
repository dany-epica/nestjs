export type PostStatusEnum = 'Published' | 'Drafted' | 'WaitingForReview';

export interface IPost {
  title: string;

  content: string;

  status: PostStatusEnum;
}
