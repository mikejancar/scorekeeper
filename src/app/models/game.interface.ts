import { HalfInning } from './half-inning.interface';
import { Team } from './team.interface';

export interface Game {
  home: Team;
  away: Team;
  datePlayed: Date;
  inning: HalfInning;
  outs: number;
  scoreHistory: Map<number, HalfInning[]>;
}
