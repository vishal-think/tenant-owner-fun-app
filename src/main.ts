import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors()

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  const port = process.env.PORT || 5000;
  await app.listen(port).then(() => {
    console.log(`🚀 Server ready at ${port}`);
  });
}
bootstrap();
