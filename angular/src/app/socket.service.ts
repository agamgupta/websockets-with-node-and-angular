import * as socketIo from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class SocketService{
    private socket;
    private observer: Observer<any>;
    initConnection(){
        this.socket = socketIo.connect("http://localhost:8085");
        console.log("connection with server established")
    }

    getDataFromServer() : Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('rfidData', res => {
                console.log("new data from server received")
                observer.next(res)
            });
        });
    }
}