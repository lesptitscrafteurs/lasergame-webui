import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lasergame-webui';

  constructor (private wsService: WebsocketService) { }

  ngOnInit(): void {
    this.wsService.connect();
  }
}
