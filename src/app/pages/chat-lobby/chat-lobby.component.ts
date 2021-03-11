import { Component, OnInit } from '@angular/core';
import {WeiWebSocket} from '@root/services/web-socket/wei-web-socket';
import {AnonymousChatUser} from '@root/model/anonymous-chat/anonymous-chat-user';
import {NzIconService} from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-chat-lobby',
  templateUrl: './chat-lobby.component.html',
  styleUrls: ['./chat-lobby.component.less']
})

export class ChatLobbyComponent implements OnInit {

  public iconNameSpace: string = 'wei-custom-icons:';

  public apiUrl: string;
  public header: {};
  public apiWebSocket: WeiWebSocket;

  public icons: string[] = [
    this.iconNameSpace + 'bird',
    this.iconNameSpace + 'chick',
    this.iconNameSpace + 'explosion',
    this.iconNameSpace + 'fishbone',
    this.iconNameSpace + 'malaria',
    this.iconNameSpace + 'sprout',
    this.iconNameSpace + 'tornado',
    this.iconNameSpace + 'burger',
    this.iconNameSpace + 'cat',
    this.iconNameSpace + 'crystal',
    this.iconNameSpace + 'in-love',
    this.iconNameSpace + 'feeding-bottle',
  ];

  public chatUser: AnonymousChatUser;

  constructor(private myWebSocket: WeiWebSocket) {

    this.apiWebSocket = myWebSocket.createNew(this.apiUrl, this.header);
  }

  public setChatUser(chatUser: AnonymousChatUser): void {

    this.chatUser = chatUser;
  }

  ngOnInit(): void {}
}
