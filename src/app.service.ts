import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPong(): string {
    return 'pong';
  }

  getSecurePong(): string {
    return 'secure_pong';
  }
}
