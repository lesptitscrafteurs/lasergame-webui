import { Component, OnInit } from '@angular/core';
import { Game } from './models/game';
import { AlertService } from './services/alert.service';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  

  constructor () { }

  ngOnInit(): void { }
  
}
