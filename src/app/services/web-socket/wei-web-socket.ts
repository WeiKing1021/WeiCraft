import {Injectable} from '@angular/core';
import {WebSocketPacket} from '@root/model/web-socket/web-socket-packet';
import {Subscription} from 'stompjs';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WeiWebSocket {

  // private url: string = 'https://api.weicraft.tw/ws/access';
  private url: string = 'http://localhost:8080/ws/access';

  private header = {};

  private client: Stomp.Client;

  public createNew(url: string, header: {}): WeiWebSocket {

    const webSocket = new WeiWebSocket();

    webSocket.url = url;
    webSocket.header = header;

    return webSocket;
  }

  public init(connectCallback: (frame?: (Stomp.Frame | undefined)) => any,
              errorCallback?: ((error: (string | Stomp.Frame)) => any) | undefined): void {

    if (this.client && this.client.connected) {

      connectCallback(undefined);

      return;
    }

    this.client = Stomp.over(new SockJS(this.url));

    // Disable console debug output.
    this.client.debug = (args) => {};

    this.client.connect(this.header, (frame) => {

      connectCallback(frame);
    }, error => {

      if (errorCallback) {

        errorCallback(error);
      }
    });
  }

  public isConnected(): boolean {

    if (!this.client || !this.client.connected) {

      return false;
    }

    return true;
  }

  public watch(destination: string, callback?: ((packet: WebSocketPacket<any>) => any) | undefined,
               headers?: {} | undefined): Subscription {

    return this.client.subscribe(destination, (message) => {

      if (message === undefined || message === null) {

        return;
      }

      if (!callback) {

        return;
      }

      const packet: WebSocketPacket<any> = JSON.parse(message.body);

      callback(packet);
    }, headers);
  }

  public publish(destination: string, packet: WebSocketPacket<any>, headers?: {} | undefined): any {

    return this.client.send(destination, headers, JSON.stringify(packet));
  }

  public disconnect(disconnectCallback: () => any, headers?: {} | undefined): void {

    this.client?.disconnect(disconnectCallback, headers);
  }
}
