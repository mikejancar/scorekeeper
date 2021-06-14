import { Component, Input } from '@angular/core';

import { Game } from '../../../models/game.interface';
import { GamesService } from '../../../shared/services/games.service';

@Component({
  selector: 'app-inning-state',
  templateUrl: './inning-state.component.html',
})
export class InningStateComponent {
  @Input() game: Game;

  constructor(private gamesService: GamesService) { }

  updateInning(toNext: boolean): void {
    this.gamesService.updateInning(toNext);
  }

  updateOuts(add: boolean): void {
    this.gamesService.updateOuts(add);
  }
}
