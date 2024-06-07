import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrmConfigFactory } from './orm.config.factory';
import { Category, Term, User } from '../entities';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        new OrmConfigFactory(configService).buildConfig(),
    }),
    MikroOrmModule.forFeature({
      entities: [Category, Term, User],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
