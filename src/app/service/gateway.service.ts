import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({providedIn: 'root'})
export class GatewayService{
    constructor(private readonly socket: Socket) {}

    onFetchJobStatus() {
        return this.socket.fromEvent('events');
    }
}