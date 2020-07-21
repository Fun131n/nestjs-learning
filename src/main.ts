import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptor/logger.interceptor';
import { AnyExceptionFilter } from './common/exception-filters/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nestWinston = app.get('NestWinston');
  //设置日志
  app.useLogger(nestWinston);
  //添加拦截器
  app.useGlobalInterceptors(
    new LoggingInterceptor(nestWinston.logger)
  )
  // //添加异常过滤器
  // app.useGlobalFilters(
  //   new AnyExceptionFilter(nestWinston.logger)
  // )
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
