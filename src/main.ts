import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptor/logger.interceptor';
import { AllExceptionsFilter } from './filter/all-exception.filter';
import { loggers } from 'winston';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from './common/config/winston.config';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ logger: false });
  const nestWinston = app.get('NestWinston');
  //设置日志
  app.useLogger(nestWinston);
  //添加拦截器
  app.useGlobalInterceptors(
    new TransformInterceptor(new Reflector()),
    new LoggingInterceptor(nestWinston.logger)
  )
  //添加异常过滤器
  app.useGlobalFilters(
    new AllExceptionsFilter(nestWinston.logger)
  )
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
