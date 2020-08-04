import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    public chats: Observable<any[]>;
    public isLogged: boolean = false;
    public statusLoaded: boolean = false;

    constructor(
        private _router: Router,
        private _fdb: AngularFirestore,
        private _auth: AuthService
    ) {
        this._auth.getAuthState()
            .subscribe(res => {
                if (res) {
                    const user = {
                        name: res.displayName,
                        uid: res.uid
                    }
                    localStorage.setItem('user', JSON.stringify(user));
                    this.isLogged = true;
                }
                this.statusLoaded = true;
            });
    }

    public logout(): void {
        this._auth.logout()
            .then(res => {
                this.isLogged = false;
                this._router.navigate(['/home']);
                localStorage.removeItem('user');
            })
            .catch(err => console.log(err));
    }
}
