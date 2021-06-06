import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Game } from '../../../models/game.interface';
import { GamesService } from '../../games.service';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
})
export class CurrentGameComponent {
  game$: Observable<Game> = this.gamesService.game$;

  constructor(private gamesService: GamesService) { }
}
