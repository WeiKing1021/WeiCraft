import { Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

/*import { SockJS } from '@types/sockjs-client/index';
import { Stomp, Client } from '@stomp/stompjs';*/

/*@Component({
  selector: 'app-web-socket',
  templateUrl: './web-socket2.component.html',
  styleUrls: ['./web-socket2.component.less']
})*/
export class WebSocketComponent implements OnInit, OnDestroy {

  @ViewChild('chatContent')
  public chatContentRef: ElementRef<HTMLDivElement>;

  public userName: string;

  public client: Stomp.Client;

  public chatContentList: ChatContent[] = Array<ChatContent>();

  public userInput: string;

  public loading: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public setUserName(userName: string): void {

    this.userName = userName;
  }

  public newWebSocket(): void {

    this.loading = true;

    if (this.client && this.client.connected) {

      this.client.disconnect(() => {

        // console.log('Disconnect');
      });
    }

    // this.client = Stomp.over(new SockJS('http://localhost:8080/ws'));
    this.client = Stomp.over(new SockJS('https://api.weicraft.tw/ws'));

    this.client.debug = (args) => {

      // console.log('Debug: ' + args);
    };

    this.client.connect({}, (frame) => {

      this.loading = false;

      this.client.subscribe('/topic/chat', (message => {

        const content: ChatContent = JSON.parse(message.body);

        this.chatContentList.push(content);

        setTimeout(() => {

          this.bottom();
        }, 1);
      }));

      this.client.send('/chat', undefined, JSON.stringify({
        author: this.userName,
        message: '大家好，我是剛來的，我叫做' + this.userName,
        time: new Date().getTime(),
      }));

    }, (error) => {

      this.loading = false;

      console.log(error);
    });
  }

  public send(): void {

    if (!this.client || !this.client.connected) {

      return;
    }

    /*if (!this.userInput || this.userInput.length === 0) {

      return;
    }

    if (this.userInput[this.userInput.length] === '\n') {

      this.userInput = this.userInput.slice(0, this.userInput.length - 1);
    }

    if (this.userInput.length === 0) {

      return;
    }*/

    this.client.send('/chat', undefined, JSON.stringify({
      author: this.userName,
      message: this.userInput,
      time: new Date().getTime(),
    }));

    this.userInput = '';
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

    this.client.disconnect(() => {

    });
  }
}

export interface ChatContent {
  author: string;
  message: string;
  time: number;
}
