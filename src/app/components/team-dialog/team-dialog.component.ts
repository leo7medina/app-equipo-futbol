import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from '../../interfaces/team';
import {Countries} from '../../interfaces/player';
import {NgForm} from '@angular/forms';
import {TeamService} from '../../services/team.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.css']
})
export class TeamDialogComponent implements OnInit {

  @Input() team: Team;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  public countries = Object.keys(Countries).map(key => ({label: key, key: Countries[key] }));

  constructor(
    private teamService: TeamService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    console.log('Init TeamDialogComponent');
  }

  onSubmit(teamForm: NgForm) {
    const teamFormValue = { ...teamForm.value };
    if (this.team) {
      this.editTeam(teamFormValue);
    } else {
      this.newTeam(teamFormValue);
    }
    // window.location.replace('#');
    this.onClose();
  }

  newTeam(teamFromValue) {
    this.teamService.addTeam(teamFromValue);
  }

  editTeam(teamFromValue) {
    const teamFromValueWithKey = { ...teamFromValue, $key: this.team.$key};
    this.teamService.editTeam(teamFromValueWithKey);
  }

  onClose() {
    this.activeModal.close('Modal Closed');
    this.closeDialog.emit(true);
  }
}
