import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  name: string = '';
  room: string = '';
  privateMessage: string = '';
  generalMessage: string = '';
  isLoggedIn: boolean = false;

  generalMessages: string[] = ['Para mandar un mensaje general solo escribe el mensaje y utiliza el botón'];
  privateMessages: string[] = [
    'Para mandar mensaje privado elige un nombre, un room, escribe tu mensaje y mándalo',
    'Puedes abrir otra pestaña con otro nombre y el mismo room para ver esos mensajes privados',
    'Puedes abrir otra pestaña con otro nombre y otro room para ver que no se ven esos mensajes privados'
  ];

  private subscriptions: Subscription[] = []

  @ViewChild('private') private: ElementRef;
  @ViewChild('general') general: ElementRef;

  constructor(private socketService: SocketService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.socketService.getPrivateMessage().subscribe(message => this.privateMessages.push(message)));
    this.subscriptions.push(this.socketService.getGeneralMessage().subscribe(message => this.generalMessages.push(message)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  sendPrivateMessage() {
    this.socketService.sendPrivateMessage(this.privateMessage);
    this.privateMessage = '';
    this.private.nativeElement.focus();
  }

  sendGeneralMessage() {
    this.socketService.sendGeneralMessage(this.generalMessage);
    this.generalMessage = '';
    this.general.nativeElement.focus();
  }

  login() {
    this.socketService.login(this.name, this.room);
    this.isLoggedIn = true;
  }
}
