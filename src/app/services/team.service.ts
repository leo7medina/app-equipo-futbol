import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Team} from '../interfaces/team';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export const TeamTableHeadres = ['Name', 'Country', 'Players'];

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamDB: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    this.teamDB = this.db.list('/teams', ref => ref.orderByChild('name'));
  }

  getTeams(): Observable<Team[]> {
    return this.teamDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()}));
      })
    );
  }

  addTeam(team: Team) {
    return this.teamDB.push(team);
  }

  deleteTeam(id: string) {
    // this.playersDB.remove(id);
    this.db.list('/teams').remove(id);
  }

  editTeam(newTeamData) {
    const $key = newTeamData.$key;
    delete(newTeamData.$key);
    this.db.list('/teams').update($key, newTeamData);
  }
}
