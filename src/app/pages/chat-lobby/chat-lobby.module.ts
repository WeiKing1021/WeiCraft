import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatLobbyComponent} from '@root/pages/chat-lobby/chat-lobby.component';
import {RouterModule, Routes} from '@angular/router';
import {NzSharedModule} from '@shared/nz-shared/nz-shared.module';
import {NgFormModule} from '@shared/ng-form/ng-form.module';
import {WeiCustomModule} from '@shared/wei-custom/wei-custom.module';
import {ChatUserLoginComponent} from '@root/pages/chat-lobby/chat-user-login/chat-user-login.component';

const routes: Routes = [
  { path: '', component: ChatLobbyComponent },
];

@NgModule({
  declarations: [
    ChatLobbyComponent,
    ChatUserLoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzSharedModule,
    NgFormModule,
    WeiCustomModule,
  ],
  exports: [
    RouterModule
  ]
})

export class ChatLobbyModule {
}
