import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { environment } from './app.environment';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from './common/config/winston.config';
import { ExtLoggerService } from './processors/helper/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ValidationOptions } from './pipes/validation.pipe.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(new WinstonConfig())
  });

  const options = new DocumentBuilder()
    .setTitle('nest接口文档')
    .setDescription('The nest API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  //添加异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(new ExtLoggerService()));
  app.useGlobalPipes(new ValidationPipe(new ValidationOptions()));
  //添加拦截器
  app.useGlobalInterceptors(
    new TransformInterceptor(new Reflector(), new ExtLoggerService()),
    // new ErrorInterceptor(new Reflector()),
  );
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()} env: ${environment}`);
}
bootstrap();
