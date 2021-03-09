import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnonymousChatContent} from '@root/model/anonymous-chat/anonymous-chat-content';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {AnonymousChatUser} from '@root/model/anonymous-chat/anonymous-chat-user';

@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket.component.html',
  styleUrls: ['./web-socket.component.less']
})
export class WebSocketComponent implements OnInit, OnDestroy {

  @ViewChild('chatContent')
  public chatContentRef: ElementRef<HTMLDivElement>;

  public chatUser: AnonymousChatUser;

  public activeUsers: Array<AnonymousChatUser> = Array<AnonymousChatUser>();

  public client: Stomp.Client;

  public chatContentList: AnonymousChatContent[] = Array<AnonymousChatContent>();

  public userInput: string;

  public loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public newUser(userName: string): void {

    this.chatUser = AnonymousChatUser.new(userName);
  }

  public newWebSocket(): void {

    this.loading = true;

    if (this.client && this.client.connected) {

      this.client.disconnect(() => {

        // console.log('Disconnect');
      });
    }

    // this.client = Stomp.over(new SockJS('http://localhost:8080/ws/anonymous-chat'));
    this.client = Stomp.over(new SockJS('https://api.weicraft.tw/ws/anonymous-chat'));

    this.client.debug = (args) => {

      // console.log('Debug: ' + args);
    };

    this.client.connect({}, (frame) => {

      this.loading = false;

      this.client.subscribe('/topic/pakUserChatPlayIn', (message => {

        const content: AnonymousChatContent = JSON.parse(message.body);

        this.chatContentList.push(content);

        setTimeout(() => {

          this.bottom();
        }, 1);
      }));

      this.client.subscribe('/topic/pakUserListPlayIn', (message => {

        this.activeUsers = JSON.parse(message.body);
      }));

      this.sendRowData('/pakUserJoinPlayOut', this.chatUser);

      this.sendMessage('大家好，我是剛來的，我叫做' + this.chatUser.name);

    }, (error) => {

      this.loading = false;

      console.log(error);
    });
  }

  public sendRowData(channel: string, data: any): void {

    this.client.send(channel, undefined, JSON.stringify(data));
  }

  public sendMessage(chatMessage: string): void {

    this.sendRowData('/pakUserChatPlayOut', AnonymousChatContent.create(this.chatUser, chatMessage));
  }

  public send(): void {

    const toSend = this.userInput.replace(/^\s+|\s+$/, '');
    this.userInput = '';

    if (!toSend) {
      return;
    }

    this.sendMessage(toSend);
  }

  public bottom(): void {

    if (!this.chatContentRef) {

      return;
    }

    this.chatContentRef.nativeElement.scrollTop = this.chatContentRef.nativeElement.scrollHeight;
  }

  ngOnDestroy(): void {

    if (!this.client) {

      return;
    }

    if (!this.client.connected) {

      return;
    }

    this.sendMessage('大家掰掰～');

    this.sendRowData('/pakUserQuitPlayOut', this.chatUser);

    this.client.disconnect(() => {

    });
  }
}
