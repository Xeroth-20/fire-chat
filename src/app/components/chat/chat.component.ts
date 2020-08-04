import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ChatMessage } from 'src/app/interfaces/chat-message.interface';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styles: [
    ]
})
export class ChatComponent implements OnInit {

    public cms: ChatMessage[];
    public chatBoxBody: any;
    public user: any;

    constructor(
        private _chat: ChatService
    ) {
        this._chat.loadChatMessages()
            .subscribe((cms: ChatMessage[]) => {
                this.cms = cms;
                setTimeout(() => {
                    this.chatBoxBody.scrollTop = this.chatBoxBody.scrollHeight;
                }, 20)
            });
    }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.chatBoxBody = document.querySelector('.chat-box-body');
    }

    public sendChatMessage(messageCtrl: any): void {
        if (messageCtrl.value) {
            const chatMessage: ChatMessage = {
                username: this.user.name,
                message: messageCtrl.value,
                date: new Date().getTime(),
                uid: this.user.uid
            }
            this._chat.postChatMessage(chatMessage)
                .then(res => console.log(res))
                .catch(err => console.log(err));
            messageCtrl.value = '';
        }
    }
}
