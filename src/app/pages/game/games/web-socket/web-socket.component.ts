import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnonymousChatContent} from '@root/model/anonymous-chat/anonymous-chat-content';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {AnonymousChatUser} from '@root/model/anonymous-chat/anonymous-chat-user';
import {WeiWebSocket} from '@root/services/web-socket/wei-web-socket';
import {WebSocketPacket} from '@root/model/web-socket/web-socket-packet';

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

  public chatContentList: Array<AnonymousChatContent> = Array<AnonymousChatContent>();

  public chatContentSub: Stomp.Subscription;

  public userListSub: Stomp.Subscription;

  public userInput: string;

  public loading: boolean = false;

  constructor(public myWebSocket: WeiWebSocket) {}

  ngOnInit(): void {}

  public newUser(userName: string): void {

    this.chatUser = AnonymousChatUser.new(null, userName);
  }

  public newWebSocket(): void {

    this.loading = true;

    this.myWebSocket.init((frame) => {

      this.loading = false;

      if (this.chatContentSub) {

        this.chatContentSub.unsubscribe();
      }

      this.chatContentSub = this.myWebSocket.watch('/topic/pakUserChatPlayIn', packet => {

        this.chatContentList.push(packet.container);

        setTimeout(() => {

          this.bottom();
        }, 1);
      });

      this.userListSub = this.myWebSocket.watch('/topic/pakUserListPlayIn', packet => {

        this.activeUsers = packet.container;
      });

      this.sendRowData('/pakUserJoinPlayOut', this.chatUser);

      this.sendMessage('大家好，我是剛來的，我叫做' + this.chatUser.name);
    }, (error) => {

      console.log(error);
    });
  }

  public sendRowData(channel: string, data: any): void {

    this.myWebSocket.publish(channel, WebSocketPacket.newAnonymous(data));
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

    this.sendMessage('');

    if (this.chatContentSub) {

      this.chatContentSub.unsubscribe();
    }

    this.myWebSocket.disconnect(() => {

      console.log('Disconnected');
    });
  }
}
