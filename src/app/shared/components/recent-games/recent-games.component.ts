import { Component } from '@angular/core';

import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-recent-games',
  templateUrl: './recent-games.component.html',
})
export class RecentGamesComponent {
  constructor(public gamesService: GamesService) { }
}
