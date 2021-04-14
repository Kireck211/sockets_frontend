import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client'

@Injectable()
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('ws://localhost:3000');
  }

  login(name, room) {
    this.socket.emit('login', ({ name, room }));
  }

  sendPrivateMessage(message) {
    this.socket.emit('sendPrivateMessage', message);
  }

  getPrivateMessage() {
    return new Observable<string>(observer => {
      this.socket.on('privateMessage', message => {
        observer.next(message);
      })
    })
  }

  sendGeneralMessage(message) {
    this.socket.emit('sendGeneralMessage', message);
  }

  getGeneralMessage() {
    return new Observable<string>(observer => {
      this.socket.on('generalMessage', message => {
        observer.next(message);
      })
    })
  }
}