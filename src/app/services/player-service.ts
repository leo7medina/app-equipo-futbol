import { Injectable } from '@angular/core';
import {Player} from '../interfaces/player';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';

export const PlayerTableHeader = ['Name', 'LastName', 'Position', 'Weight', 'Height', 'Nationality', 'LeftFooted'];

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersDB: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playersDB = this.db.list('/players', ref => ref.orderByChild('name'));
  }

  getPlayers(): Observable<Player[]> {
    return this.playersDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()}));
      })
    );
  }

  addPlayer(player: Player) {
    return this.playersDB.push(player);
  }

  deletePlayer(id: string) {
    // this.playersDB.remove(id);
    this.db.list('/players').remove(id);
  }

  editPlayer(newPlayerData) {
    const $key = newPlayerData.$key;
    delete(newPlayerData.$key);
    this.db.list('/players').update($key, newPlayerData);
  }
}
