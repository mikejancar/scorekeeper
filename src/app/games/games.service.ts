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
    const savedGame = this.retrieveGame();
    this.currentGame = new BehaviorSubject(savedGame);
    this.game$ = this.currentGame;
  }

  startGame(homeTeam: string, awayTeam: string, gameDate: Date): void {
    const newGame: Game = {
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
    };
    this.saveGame(newGame);
  }

  updateInning(toNext: boolean): void {
    const game = this.currentGame.value;
    const currentHalf = game.inning.half;
    const currentNumber = game.inning.number;

    if (toNext && currentHalf === 'Bot') {
      game.inning.number++;
    } else if (!toNext && currentHalf === 'Top' && currentNumber > 1) {
      game.inning.number--;
    }
    if (toNext || (currentHalf !== 'Top' || currentNumber > 1)) {
      game.inning.half = currentHalf === 'Top' ? 'Bot' : 'Top';
    }

    this.saveGame(game);
  }

  updateOuts(add: boolean): void {
    const game = this.currentGame.value;

    if (add && game.outs < 3) {
      game.outs++;
    } else if (!add && game.outs > 0) {
      game.outs--;
    }

    this.saveGame(game);
  }

  updateScore(team: 'home' | 'away', add: boolean): void {
    const game = this.currentGame.value;

    if (add) {
      game[team].score++;
    } else if (!add && game[team].score > 0) {
      game[team].score--;
    }

    this.saveGame(game);
  }

  private retrieveGame(): Game {
    const gameString = window.localStorage.getItem('currentGame');
    if (gameString) {
      return JSON.parse(gameString);
    }
  }

  private saveGame(game: Game): void {
    window.localStorage.setItem('currentGame', JSON.stringify(game));
  }
}
