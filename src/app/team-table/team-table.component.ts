import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Team} from '../interfaces/team';
import {TeamService, TeamTableHeadres} from '../services/team.service';
import {take} from 'rxjs/operators';
import {Countries} from '../interfaces/player';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.css']
})
export class TeamTableComponent implements OnInit {

  public teams$: Observable<Team[]>;
  public tableHeaders = TeamTableHeadres;

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.teams$ = this.teamService.getTeams();
    this.teamService.getTeams().pipe(take(1)).subscribe(teams => {
      if (teams.length === 0) {
        const team: Team = {
          name: 'MyAmazingTeam',
          country: Countries.Argentina,
          players: null
        };
        this.teamService.addTeam(team);
      }
    });
  }

}
