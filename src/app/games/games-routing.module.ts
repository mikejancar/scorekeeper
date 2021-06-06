import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentGameComponent } from './components/current-game/current-game.component';
import { NewGameComponent } from './components/new-game/new-game.component';

const routes: Routes = [
  { path: 'new', component: NewGameComponent },
  { path: 'current', component: CurrentGameComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
