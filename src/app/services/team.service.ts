import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Team} from '../interfaces/team';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamDB: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    this.teamDB = this.db.list('/teams', ref => ref.orderByChild('name'));
  }

  getPlayers(): Observable<Team[]> {
    return this.teamDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()}));
      })
    );
  }

  addPlayer(team: Team) {
    return this.teamDB.push(team);
  }

  deletePlayer(id: string) {
    // this.playersDB.remove(id);
    this.db.list('/teams').remove(id);
  }

  editPlayer(newTeamData) {
    const $key = newTeamData.$key;
    delete(newTeamData.$key);
    this.db.list('/teams').update($key, newTeamData);
  }
}
