import { Component, Input } from '@angular/core';

import { Team } from '../../../models/team.interface';

@Component({
  selector: 'app-team-score',
  templateUrl: './team-score.component.html',
})
export class TeamScoreComponent {
  @Input() team: Team;
  @Input() header: string;
}
