import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private _afAuth: AngularFireAuth
    ) { }

    public login(w: string): Promise<any> {
        if (w === 'google') {
            return this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        } else if (w === 'facebook') {
            return this._afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
        }
    }

    public logout(): Promise<any> {
        return this._afAuth.auth.signOut();
    }

    public getAuthState(): Observable<any> {
        return this._afAuth.authState;
    }
}
