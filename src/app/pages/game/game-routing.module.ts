import { HammerComponent } from './games/hammer/hammer.component';
import { FingerGuessingComponent } from './games/finger-guessing/finger-guessing.component';
import { GameComponent } from './game.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {WebSocketComponent} from './games/web-socket/web-socket.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'finger-guessing', component: FingerGuessingComponent, data: {
    customBreadcrumb: '猜拳小遊戲',
  }},
  { path: 'hammer', component: HammerComponent, data: {
    customBreadcrumb: '畢卡索製造器',
  }},
  { path: 'web-socket', component: WebSocketComponent, data: {
      customBreadcrumb: 'WebSocket',
    }},
  { path: '**', component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule { }