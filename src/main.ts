import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as figlet from 'figlet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser()); // ✅ Active le support des cookies
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Rental location Platform API Documentation')
    .setDescription(
      'Here are classified all the APIs available in the backend and also how to retrieve and access this data',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const backOfficeDocument = SwaggerModule.createDocument(app, config);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  SwaggerModule.setup('api/bo', app, backOfficeDocument, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: "Back office API's docs",
  });
  await app.listen(4000, async () => {
    figlet('2025 - Rental Location ', (_, data) => {
      console.log('\x1b[1m\x1b[32m%s\x1b[0m', data);
      figlet('Powered By VICTORY', { font: 'Small' }, (a, res) =>
        console.log('\x1b[35m%s\x1b[0m', res),
      );
    });
  });
}
bootstrap();
