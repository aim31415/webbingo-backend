import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardController } from './card.controller';
import { CardCreatorService } from './cardcreator.service';

@Module({
  imports: [],
  controllers: [AppController, CardController],
  providers: [AppService, CardCreatorService],
})
export class AppModule {}
