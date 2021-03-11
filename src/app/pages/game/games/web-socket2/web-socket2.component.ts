import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { AnonymousChatContent } from '@root/model/anonymous-chat/anonymous-chat-content';
import {AnonymousChatUser} from '@root/model/anonymous-chat/anonymous-chat-user';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Stomp} from '@stomp/stompjs';
import {WebSocketPacket} from '@root/model/web-socket/web-socket-packet';
import {Observable, Subject, timer} from 'rxjs';
import {timeInterval} from 'rxjs/operators';

@Component({
  selector: 'app-web-socket2',
  templateUrl: './web-socket2.component.html',
  styleUrls: ['./web-socket2.component.less']
})
export class WebSocket2Component implements OnInit, OnDestroy {

  @ViewChild('chatContent')
  public chatContentRef: ElementRef<HTMLDivElement>;

  public chatUser: AnonymousChatUser;

  public activeUsers: Array<AnonymousChatUser> = Array<AnonymousChatUser>();

  public client: WebSocketSubject<unknown>;

  public chatContentList: AnonymousChatContent[] = Array<AnonymousChatContent>();

  public userInput: string;

  public loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public newUser(userName: string): void {

    this.chatUser = AnonymousChatUser.new(null, userName);
  }

  public newWebSocket(): void {

    this.loading = true;

    if (!this.client?.closed && !this.client?.isStopped) {

      this.client?.unsubscribe();
    }

    this.client = webSocket({
      url: 'ws://localhost:8080/ws',
      // url: 'wss://api.weicraft.tw/ws/anonymous-chat',
      // Connection establish callback.
      openObserver: {
        next: (event: Event) => {

          console.log('Connected.');

          const s = timer(0, 1000).subscribe((val) => {

            this.client.next('Hello 0_0');

            if (val >= 10) {

              s.unsubscribe();
            }
          });
        }
      },
      // Connection close callback.
      closeObserver: {
        next: (event: CloseEvent) => {

          console.log('Disconnected');
        }
      },
    });

    this.client.subscribe();

    this.client.subscribe(next => {
      console.log(next);
    });

    /*
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

        const userArray: Array<AnonymousChatUser> = JSON.parse(message.body);

        this.activeUsers = userArray;
      }));

      this.sendRowData('/pakUserJoinPlayOut', this.chatUser);

      this.sendMessage('大家好，我是剛來的，我叫做' + this.chatUser.name);

    }, (error) => {

      this.loading = false;

      console.log(error);
    });*/
  }

  public sendRowData(channel: string, data: any): void {

    // this.client.send(channel, undefined, JSON.stringify(data));
  }

  public sendMessage(chatMessage: string): void {

    this.sendRowData('/pakUserChatPlayOut', AnonymousChatContent.create(this.chatUser, chatMessage));
  }

  public send(): void {

    const tmpInput = this.userInput.replace(/^\s+|\s+$/, '');

    this.userInput = '';

    if (tmpInput === '') {

      return;
    }

    this.sendMessage(tmpInput);
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

    /*if (!this.client.connected) {

      return;
    }

    this.sendMessage('大家掰掰～');

    this.sendRowData('/pakUserQuitPlayOut', this.chatUser);

    this.client.disconnect(() => {

    });*/
  }
}
