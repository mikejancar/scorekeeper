import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Game } from '../../../models/game.interface';
import { GamesService } from '../../../shared/services/games.service';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
})
export class CurrentGameComponent {
  game$: Observable<Game> = this.gamesService.game$;

  constructor(private gamesService: GamesService, private router: Router) { }

  saveGame(exit: boolean): void {
    this.gamesService.saveGame(exit);
    if (exit) {
      this.router.navigate(['/']);
    }
  }
}
