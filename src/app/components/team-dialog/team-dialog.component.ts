import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../../interfaces/team';
import {Countries} from '../../interfaces/player';
import {NgForm} from '@angular/forms';
import {TeamService} from '../../services/team.service';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.css']
})
export class TeamDialogComponent implements OnInit {

  @Input() team: Team;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  public countries = Object.keys(Countries).map(key => ({label: key, key: Countries[key] }));

  constructor(private teamService: TeamService) { }

  ngOnInit() {
  }

  onSubmit(teamForm: NgForm) {
    const teamFormValue = { ...teamForm.value };
    if (this.team) {
      this.editTeam(teamFormValue);
    } else {
      this.newTeam(teamFormValue);
    }
    window.location.replace('#');
  }

  newTeam(teamFromValue) {
    const key = this.teamService.addTeam(teamFromValue).key;
  }

  editTeam(teamFromValue) {
    const teamFromValueWithKey = { ...teamFromValue, $key: this.team.$key};
    this.teamService.editTeam(teamFromValueWithKey);
  }

  onClose() {
    this.closeDialog.emit(true);
  }
}
