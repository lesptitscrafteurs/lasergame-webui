import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { AlertService } from 'src/app/services/alert.service';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  public games : Game[] = [];

  constructor(
    private router: Router,
    private gameService: GameService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe (
      (games: Game[]) => {
        this.alertService.info (`<span class="text-muted">app.component.ts: </span>liste des partie en cours reçue : ${JSON.stringify(games)}`);
        this.games = games;
      });
  }

  createNewGame () : void {
    let newGame : Game = { id: -1, title: '' };
    this.gameService.createGame(newGame).subscribe (
      (game: Game) => {
        this.alertService.info (`<span class="text-muted">app.component.ts: </span>nouvelle partie créée : ${JSON.stringify(game)}`);
        this.games.push(game);
        this.router.navigate(['games', game.id]);
      }
    )
  }
}
