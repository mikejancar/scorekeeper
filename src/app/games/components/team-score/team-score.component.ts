import { Component, Input } from '@angular/core';

import { Team } from '../../../models/team.interface';
import { GamesService } from '../../games.service';

@Component({
  selector: 'app-team-score',
  templateUrl: './team-score.component.html',
})
export class TeamScoreComponent {
  @Input() team: Team;
  @Input() header: string;

  constructor(private gamesService: GamesService) { }

  updateScore(add: boolean): void {
    this.gamesService.updateScore(this.header.toLowerCase() === 'home' ? 'home' : 'away', add);
  }
}
