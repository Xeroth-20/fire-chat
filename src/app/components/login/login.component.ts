import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
    ]
})
export class LoginComponent implements OnInit {

    constructor(
        private _router: Router,
        private _auth: AuthService
    ) { }

    ngOnInit(): void {
    }

    public login(w: string): void {
        this._auth.login(w)
            .then(res => {
                setTimeout(() => {
                    this._router.navigate(['/chat'])
                }, 300);
            })
            .catch(err => console.log(err));
    }
}
