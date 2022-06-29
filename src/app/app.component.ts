import { Component, OnInit } from '@angular/core';
import { AlertService } from './services/alert.service';
import { Message, MessageCmd, WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  games : any[] = [];

  constructor (
    private wsService: WebsocketService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.wsService.connect();
    this.wsService.getMessage().subscribe (
      (message: Message) => {
        if (message.cmd == MessageCmd.GAME) {
          
        }
      }, (error) => {
        this.alertService.danger (`Une erreur est survenue avec la lecture des messages en provenance du serveur WebSocket !`);
        console.error(error);
      }
    )
  }

  createNewGame () : void {
    
  }
}
