import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Game } from '../../models/game.interface';
import { HalfInning } from '../../models/half-inning.interface';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private currentGame: BehaviorSubject<Game>;
  private savedGames: BehaviorSubject<Game[]>;

  game$: Observable<Game>;
  recentGames$: Observable<Game[]>;

  constructor() {
    const storedGame = this.retrieveCurrentGame();
    this.currentGame = new BehaviorSubject(storedGame);
    this.game$ = this.currentGame;

    const storedGames = this.retrieveRecentGames();
    this.savedGames = new BehaviorSubject(storedGames);
    this.recentGames$ = this.savedGames;
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
    this.saveCurrentGame(newGame);
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

    game.outs = 0;

    this.saveCurrentGame(game);
  }

  updateOuts(add: boolean): void {
    const game = this.currentGame.value;

    if (add && game.outs < 3) {
      game.outs++;
    } else if (!add && game.outs > 0) {
      game.outs--;
    }

    this.saveCurrentGame(game);
  }

  updateScore(team: 'home' | 'away', add: boolean): void {
    const game = this.currentGame.value;

    if (add) {
      game[team].score++;
    } else if (!add && game[team].score > 0) {
      game[team].score--;
    }

    this.saveCurrentGame(game);
  }

  saveGame(clearCurrent: boolean): void {
    const savedGames = window.localStorage.getItem('games');
    const games: Game[] = savedGames ? JSON.parse(savedGames) : [];
    games.push(this.currentGame.value);

    this.savedGames.next(games);
    window.localStorage.setItem('games', JSON.stringify(games));

    if (clearCurrent) {
      this.currentGame.next(null);
      this.saveCurrentGame(null);
    }
  }

  private retrieveCurrentGame(): Game {
    const gameString = window.localStorage.getItem('currentGame');
    if (gameString) {
      return JSON.parse(gameString);
    }
  }

  private retrieveRecentGames(): Game[] {
    const recentGameString = window.localStorage.getItem('games');
    if (recentGameString) {
      return JSON.parse(recentGameString);
    }
    return [];
  }

  private saveCurrentGame(game: Game): void {
    this.currentGame.next(game);
    window.localStorage.setItem('currentGame', JSON.stringify(game));
  }
}
