import { HammerComponent } from './games/hammer/hammer.component';
import { FingerGuessingComponent } from './games/finger-guessing/finger-guessing.component';
import { GameComponent } from './game.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'finger-guessing', component: FingerGuessingComponent, data: {
    customBreadcrumb: '猜拳小遊戲',
  }},
  { path: 'hammer', component: HammerComponent, data: {
    customBreadcrumb: '手勢測試',
  }},
  { path: '**', component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule { }
