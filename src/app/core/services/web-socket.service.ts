import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl, {
      transports: ['websocket', 'polling'],
      reconnection: false,
      withCredentials: true,
    });
  }

  sendComment(room: string, comment: any) {
    this.socket.emit('send-comment', { room, comment });
  }

  joinRoom(id: string) {
    this.socket.emit('join-room', id);
  }

  leaveRoom(roomId: string) {
    this.socket.emit('leave-room', roomId);
  }

  receiveComment(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('receive-comment', (data) => {
        observer.next(data);
      });
    });
  }
}
