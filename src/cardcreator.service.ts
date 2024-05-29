import { Injectable } from '@nestjs/common';

@Injectable()
export class CardCreatorService {
  getCard(category: string, x: number, y: number): string[][] {
    // db connector get category - wordlist -- error if wordlist is to short
    const wordlist = [
      'Hochwasserhose',
      'Undercut',
      'Tattoo',
      'Hip Hip',
      'Debiler Blick',
    ];
    const card: string[][] = Array.from({ length: x }, (_, index) =>
      Array.from({ length: y }),
    );
    for (let i = 0; i < x * y; i++) {
      const index = Math.floor(Math.random() * wordlist.length);
      card[Math.floor(i / y)][i % y] = wordlist[index];
      wordlist[index] = wordlist[wordlist.length - 1];
      wordlist.pop();
    }
    return card;
  }
}
