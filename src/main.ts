import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
// import { MikroORM } from '@mikro-orm/core';
// import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { json } from 'express';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/all-exceptions.filter';
import type { Chalk } from 'chalk';
const chalkPromise = import('chalk');

const logger = new Logger('main');

let colorMessage: Chalk;
let colorError: Chalk;

process.on('SIGTERM', async () => {
  logger.log(colorMessage('SIGTERM received, shutting down gracefully...'));
  process.exit(128 + 15);
});

process.on('SIGINT', () => {
  logger.log(colorMessage('SIGINT received, shutting down...'));
  process.exit(128 + 2);
});

process.on('exit', (code) => {
  logger.log(colorMessage(`About to exit with code: ${code}`));
});

async function bootstrap() {
  const chalk = await chalkPromise;
  colorMessage = chalk.default.bgRgb(0, 0, 70).whiteBright;
  colorError = chalk.default.bgRgb(70, 0, 0).whiteBright;

  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    exposedHeaders: 'Authorization',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  // const highlighter = new SqlHighlighter();

  // const orm = app.get(MikroORM);
  // const generator = orm.schema;

  // const dropDump = await generator.getDropSchemaSQL();
  // console.log(highlighter.highlight(dropDump));

  // const createDump = await generator.getCreateSchemaSQL();
  // console.log(highlighter.highlight(createDump));

  // const updateDump = await generator.getUpdateSchemaSQL();
  // console.log(highlighter.highlight(updateDump));

  await app.listen(8080);
}
bootstrap();
