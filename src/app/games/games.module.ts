import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CurrentGameComponent } from './components/current-game/current-game.component';
import { InningStateComponent } from './components/inning-state/inning-state.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { TeamScoreComponent } from './components/team-score/team-score.component';
import { GamesRoutingModule } from './games-routing.module';

@NgModule({
  declarations: [NewGameComponent, CurrentGameComponent, TeamScoreComponent, InningStateComponent],
  imports: [
    CommonModule,
    SharedModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
