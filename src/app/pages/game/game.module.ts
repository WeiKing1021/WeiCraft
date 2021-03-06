import { WeiHammerDirective } from './../../directive/wei-hammer.directive';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { NzSharedModule } from '@shared/nz-shared/nz-shared.module';
import { NgFormModule } from './../../shared/ng-form/ng-form.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FingerGuessingComponent } from './games/finger-guessing/finger-guessing.component';
import { HammerComponent } from './games/hammer/hammer.component';
import { WeiCustomModule } from '@shared/wei-custom/wei-custom.module';
import { WebSocketComponent } from './games/web-socket/web-socket.component';
import { WebSocket2Component } from '@root/pages/game/games/web-socket2/web-socket2.component';
import {NzMessageService} from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    GameComponent,
    FingerGuessingComponent,
    HammerComponent,
    WebSocketComponent,
    WebSocket2Component,
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    NgFormModule,
    NzSharedModule,
    WeiCustomModule,
  ],
})
export class GameModule { }
