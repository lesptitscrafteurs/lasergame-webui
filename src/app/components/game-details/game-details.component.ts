import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/game';
import { AlertService } from 'src/app/services/alert.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  public game: Game|null;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private alertService: AlertService
  ) {
    this.game = null;
  }

  ngOnInit(): void {
    let gameId: string|null = this.route.snapshot.paramMap.get('gameId');
    if (gameId) {
      this.gameService.getGame(+gameId).subscribe (
        (game: Game) => {
          this.alertService.info (`<span class="text-muted">app.component.ts: </span>partie ${gameId} reçue : ${JSON.stringify(game)}`);
          this.game = game;
        });
    }
  }

}
