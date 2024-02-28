import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class MessageService {
    private _listners = new Subject<any>();

    listenMessage(): Observable<any> {
        return this._listners.asObservable();
    }

    sendMessage(filterBy: string): void {
        this._listners.next(filterBy);
    }

}
