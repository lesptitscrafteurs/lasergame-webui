import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GameListComponent } from './components/game-list/game-list.component';

const routes: Routes = [
  { path: "games", component: GameListComponent },
  { path: "games/:gameId", component: GameDetailsComponent },
  { path: '',   redirectTo: '/games', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
