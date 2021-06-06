import { Team } from './team.interface';

export interface HalfInning {
  number: number;
  half: 'Top' | 'Bot';
  home: Team;
  away: Team;
}
