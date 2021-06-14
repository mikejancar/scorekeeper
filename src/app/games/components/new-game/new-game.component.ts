import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { GamesService } from '../../../shared/services/games.service';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html'
})
export class NewGameComponent implements OnInit {
  form: FormGroup;
  teamOptions: string[] = [];
  filteredHomeTeams: Observable<string[]>;
  filteredAwayTeams: Observable<string[]>;

  constructor(private fb: FormBuilder, private gamesService: GamesService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      homeTeam: ['', Validators.required],
      awayTeam: ['', Validators.required],
      gameDate: [new Date(), Validators.required]
    });

    const storedTeams = window.localStorage.getItem('teams');
    this.teamOptions = storedTeams ? storedTeams.split(',') : [];

    this.filteredHomeTeams = this.homeTeam.valueChanges.pipe(
      startWith(''),
      map(value => this.filterTeams(value))
    );
    this.filteredAwayTeams = this.awayTeam.valueChanges.pipe(
      startWith(''),
      map(value => this.filterTeams(value))
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.saveTeams();
      this.gamesService.startGame(this.homeTeam.value, this.awayTeam.value, this.form.get('gameDate').value);
      this.router.navigate(['games', 'current']);
    }
  }

  get homeTeam(): AbstractControl {
    return this.form.get('homeTeam');
  }

  get awayTeam(): AbstractControl {
    return this.form.get('awayTeam');
  }

  private saveTeams(): void {
    const storedTeams = window.localStorage.getItem('teams');
    const currentTeams = storedTeams ? storedTeams.split(',') : [];
    const homeTeam = this.homeTeam.value;
    const awayTeam = this.awayTeam.value;

    if (!currentTeams.includes(homeTeam)) {
      currentTeams.push(homeTeam);
    }
    if (!currentTeams.includes(awayTeam)) {
      currentTeams.push(awayTeam);
    }

    window.localStorage.setItem('teams', currentTeams.join(','));
  }

  private filterTeams(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.teamOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
