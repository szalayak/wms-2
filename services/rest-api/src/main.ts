import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('WMS-2 API')
    .setDescription('The WMS-2 API description')
    .setVersion('1.0')
    .addTag('wms-2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { customSiteTitle: 'WMS-2 API' });

  await app.listen(4000);
}
bootstrap();
