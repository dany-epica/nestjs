import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Post as DBPost } from './entities/post.entity';

@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private authService: AuthService,
  ) {}

  @Get('')
  async findMany(@Query() query_params: any) {
    return this.postsService.findMany(
      +query_params.startIndex,
      +query_params.userId,
      query_params.orderBy,
      query_params.orderAsc == 'true',
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Request() req: any,
    @Body() createPostDto: CreatePostDto,
  ): Promise<DBPost> {
    const user = await this.authService.userFromJwt(req);
    const post = { ...createPostDto, userId: user.id };
    return this.postsService.create(post);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    const rowsUpdated = (await this.postsService.update(id, updatePostDto))[0];
    return {
      success: rowsUpdated > 0,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Request() req: any, @Param('id') id: string) {
    const user = await this.authService.userFromJwt(req);
    return this.postsService.remove(+id, user.id);
  }
}
