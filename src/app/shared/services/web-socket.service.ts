import { Injectable } from '@angular/core';
import { Client, IFrame, IStompSocket, Stomp, StompConfig } from '@stomp/stompjs';

import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  stompClient: Client;
  disabled: boolean;
  greetings: string[];

  constructor() {
    this.stompClient = new Client();
    this.disabled = true;
    this.greetings = [];
  }

  public connect(url: string) {
    // const socket = new SockJS(`http://192.168.0.109:4201/ws`);
    let config = new StompConfig();
    config.connectHeaders= {"Authorization": "xyz"};
    this.stompClient = new Client(config);
    this.stompClient.webSocketFactory= function () {
      return new SockJS(`http://192.168.0.109:4201/ws?auth=${localStorage.getItem("token")}`) as IStompSocket;
    };
    this.stompClient.configure({
      onConnect: (frame: IFrame) => {
        this.setConnected(true);
        console.log("Okkk");
        console.log('Connected: ' + frame);
        console.log("onConnect", frame);
        this.stompClient.subscribe(`/user/${localStorage.getItem("username")}/queue/messages`, (message: { body: string; ack: () => void; }) => {
          console.log(message.body);
          this.showGreeting(JSON.parse(message.body));
          message.ack();
        });
        this.sendName();
      },
    });
    this.stompClient.activate();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.deactivate();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendMessage(
    senderId: string,
    senderName: string,
    recipientId: string,
    recipientName: string,
    content: string,
    type: number,
  ) {
    this.stompClient.publish({
      destination: '/app/chat',
      headers: {
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        senderId: senderId,
        senderName: senderName,
        recipientId: recipientId,
        recipientName: recipientName,
        content: content,
        type: type,
      }),
    });
  }

  sendName() {
    this.stompClient.publish({
      destination: '/app/chat',
      headers: {
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        senderId: localStorage.getItem("username") ?? "hrishi",
        senderName: "Hrishi",
        recipientId: "koibiju",
        recipientName: "Koi Biju",
        content: "Dekho message",
        type: 0,
      }),
    });
  }

  showGreeting(message: any) {
    this.greetings?.push(message);
  }
}
