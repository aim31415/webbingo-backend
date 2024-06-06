import { OrmModuleConfigProperties } from './orm.module.config.properties';
import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { MariaDbDriver } from '@mikro-orm/mariadb';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('MikroORM');

export class OrmConfigFactory {
  constructor(private configService: ConfigService) {}

  public buildConfig(): Options {
    const config = {
      entities: ['dist/entities'],
      entitiesTs: ['src/entities'],
      host: this.configService.get<string>(
        OrmModuleConfigProperties.ENV_DATABASE_HOST,
      ),
      dbName: this.configService.get<string>(
        OrmModuleConfigProperties.ENV_DATABASE_SCHEMA,
      ),
      user: this.configService.get<string>(
        OrmModuleConfigProperties.ENV_DATABASE_USER,
      ),
      password: this.configService.get<string>(
        OrmModuleConfigProperties.ENV_DATABASE_PASSWORD,
      ),
      driver: MariaDbDriver,
      port: this.configService.get<number>(
        OrmModuleConfigProperties.ENV_DATABASE_PORT,
      ),
      forceUtcTimezone: true,
      metadataProvider: TsMorphMetadataProvider,
      highlighter: new SqlHighlighter(),
      debug:
        this.configService.get<string>(
          OrmModuleConfigProperties.ENV_DATABASE_DEBUG,
        ) === 'true',
      logger: logger.log.bind(logger),
    } as Options;

    return config;
  }
}
