import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatMessage } from './../interfaces/chat-message.interface';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private chatMessagesCollection: AngularFirestoreCollection<ChatMessage>;

    constructor(
        private _afs: AngularFirestore
    ) { }

    public loadChatMessages(): Observable<ChatMessage[]> {
        this.chatMessagesCollection = this._afs.collection<ChatMessage>('chatMessages',
            ref => ref.orderBy('date', 'desc').limit(6));

        return this.chatMessagesCollection.valueChanges()
            .pipe(
                map(res => {
                    res.reverse();
                    
                    return res;
                })
            );
    }

    public postChatMessage(cm: ChatMessage): Promise<any> {
        return this.chatMessagesCollection.add(cm);
    }
}
