import { Injectable } from '@angular/core';
import { Client, IFrame, Stomp } from '@stomp/stompjs';

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
    const socket = new SockJS(`http://localhost:8080/ws`);
    this.stompClient = Stomp.over(socket);
    this.stompClient.configure({
      onConnect: (frame: IFrame) => {
        this.setConnected(true);
        console.log("Okkk");
        console.log('Connected: ' + frame);
        console.log("onConnect", frame);
        this.stompClient.subscribe(`/user/${localStorage.getItem("username")}/queue/messages`, (message: { body: string; ack: () => void; }) => {
          console.log(message.body);
          this.showGreeting(JSON.parse(message.body).senderName);
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

  sendName() {
    this.stompClient.publish({
      destination: '/app/chat',
      headers: {},
      body: JSON.stringify({
        senderId: localStorage.getItem("username"),
        senderName: "koi toh hai",
        recipientId: localStorage.getItem("username"),
        recipientName: "koi toh hai",
        content: "Jo message",
        type: "CHAT",
      })
    });
  }

  showGreeting(message: any) {
    this.greetings?.push(message);
  }
}
