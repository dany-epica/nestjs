import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

interface HotModule extends NodeModule {
  hot: any;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const _module = module as HotModule;

  if (_module.hot) {
    _module.hot.accept();
    _module.hot.dispose(() => app.close());
  }
}
bootstrap();
