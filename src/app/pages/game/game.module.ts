import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { NzSharedModule } from '@shared/nz-shared/nz-shared.module';
import { NgFormModule } from './../../shared/ng-form/ng-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FingerGuessingComponent } from './games/finger-guessing/finger-guessing.component';

@NgModule({
  declarations: [
    GameComponent,
    FingerGuessingComponent,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    NgFormModule,
    NzSharedModule,
  ]
})
export class GameModule { }
