import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  app.setGlobalPrefix('/api');
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('WMS-2 API')
    .setDescription('The WMS-2 API description')
    .setVersion('1.0')
    .addTag('wms-2')
    .addCookieAuth('jwt_token', {
      type: 'http',
      bearerFormat: 'access_token',
      description: 'JWT Access Token',
      in: 'cookie',
      scheme: 'Bearer',
    })
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { customSiteTitle: 'WMS-2 API' });

  await app.listen(4000);
}
bootstrap();
