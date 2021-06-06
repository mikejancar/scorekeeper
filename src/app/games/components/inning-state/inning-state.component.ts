import { Component, Input } from '@angular/core';

import { Game } from '../../../models/game.interface';

@Component({
  selector: 'app-inning-state',
  templateUrl: './inning-state.component.html',
})
export class InningStateComponent {
  @Input() game: Game;
}
