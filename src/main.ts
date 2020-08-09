import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logger.interceptor';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const nestWinston = app.get('NestWinston');
  //设置日志
  app.useLogger(nestWinston);
  //添加异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(nestWinston.logger));
  app.useGlobalPipes(new ValidationPipe());
  //添加拦截器
  app.useGlobalInterceptors(
    new TransformInterceptor(new Reflector(), nestWinston.logger),
    new ErrorInterceptor(new Reflector()),
    // new LoggingInterceptor(nestWinston.logger)
  );
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
