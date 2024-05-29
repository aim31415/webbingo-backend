import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CardCreatorService } from './cardcreator.service';

@Controller('cardcreator')
export class CardController {
  constructor(private readonly cardService: CardCreatorService) {}

  @Get()
  getCard(
    @Query('category') category: string,
    @Query('x') x: number,
    @Query('y') y: number,
  ): string {
    return JSON.stringify(this.cardService.getCard(category, x, y));
  }
}
