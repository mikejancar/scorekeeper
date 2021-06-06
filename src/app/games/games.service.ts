import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Game } from '../models/game.interface';
import { HalfInning } from '../models/half-inning.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private currentGame: BehaviorSubject<Game>;

  game$: Observable<Game>;

  constructor() {
    this.currentGame = new BehaviorSubject(null);
    this.game$ = this.currentGame;
  }

  startGame(homeTeam: string, awayTeam: string, gameDate: Date): void {
    this.currentGame.next({
      home: { name: homeTeam, score: 0 },
      away: { name: awayTeam, score: 0 },
      datePlayed: gameDate,
      inning: {
        number: 1,
        half: 'Top',
        home: { name: homeTeam, score: 0 },
        away: { name: awayTeam, score: 0 }
      },
      outs: 0,
      scoreHistory: new Map<number, HalfInning[]>()
    });
  }
}
