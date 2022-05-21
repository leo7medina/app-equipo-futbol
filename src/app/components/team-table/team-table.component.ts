import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';
import {Team} from '../../interfaces/team';
import {TeamService, TeamTableHeadres} from '../../services/team.service';
import {take} from 'rxjs/operators';
import {Countries} from '../../interfaces/player';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {TeamDialogComponent} from '../team-dialog/team-dialog.component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.css']
})
export class TeamTableComponent implements OnInit {

  public teams$: Observable<Team[]>;
  public tableHeaders = TeamTableHeadres;
  public showModal = false;
  public selectedTeam: Team;
  closeResult: string;
  //
  team: Team;
  public countries = Object.keys(Countries).map(key => ({label: key, key: Countries[key] }));

  constructor(
    private teamService: TeamService,
    private modalService: NgbModal
  ) { }

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

  /*newTeam() {
    this.showModal = true;
    this.selectedTeam = null;
    setTimeout(() => {
      window.location.replace('#/open-modalTeam');
    });
  }*/

  newTeam(content: any) {
    this.showModal = true;
    this.selectedTeam = null;
    this.team = null;
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
      modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
    /*const modalRef = this.modalService.open(ModalComponent);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });*/
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  editTeam(team: Team, content: any) {
    this.selectedTeam = { ...team };
    this.showModal = true;
    this.team = { ...team};
    const modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(this.closeResult);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
    });
    /*setTimeout( () => {
      window.location.replace('#open-modalTeam');
    });*/
  }

  deleteTeam(team: Team) {
    this.teamService.deleteTeam(team.$key);
  }

  closeDialog() {
    this.showModal = false;
    this.selectedTeam = null;
  }

  onCloseModal(modal: NgbModalRef, result?: string) {
    let str = 'Closed Modal';
    if (result) {
      str = result;
    }
    modal.close(str);
  }

  onSubmit(teamForm: NgForm, modal: NgbModalRef) {
    const teamFormValue = { ...teamForm.value };
    if (this.team) {
      this.editTeamForm(teamFormValue);
    } else {
      this.newTeamForm(teamFormValue);
    }
    // window.location.replace('#');
    this.onCloseModal(modal, 'Closed Modal Submit');
  }

  newTeamForm(teamFromValue) {
    this.teamService.addTeam(teamFromValue);
  }

  editTeamForm(teamFromValue) {
    const teamFromValueWithKey = { ...teamFromValue, $key: this.team.$key};
    this.teamService.editTeam(teamFromValueWithKey);
  }

}
