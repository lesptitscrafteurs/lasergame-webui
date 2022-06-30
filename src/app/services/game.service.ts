import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { AlertService } from './alert.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private api: ApiService,
    private alert: AlertService
  ) { }

  public getGames () : Observable<Game[]> {
    this.alert.info (`<span class="text-muted">game.service.ts: </span>consultation du serveur http pour obtenir la liste des parties en cours...`);
    return this.api.get(`games`);
  }

  public getGame (gameId: number) : Observable<Game> {
    this.alert.info (`<span class="text-muted">game.service.ts: </span>consultation du serveur http pour obtenir la partie ${gameId}...`);
    return this.api.get(`games/${gameId}`);
  }

  public createGame (game: Game) : Observable<Game> {
    this.alert.info (`<span class="text-muted">game.service.ts: </span>demande de création d'une nouvelle partie au serveur http...`);
    return this.api.post(`games`, game);
  }
}
