
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

export interface User {
    uid: string;
    email: string;
    phone?: string;
    name?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user$: Observable<User>;

    constructor(
        private afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        private ngZone: NgZone) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap((user: firebase.User) => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            }));
    }

    async login(form: any) {
        const { email, password } = form;
        return await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }

    async sendPasswordResetEmail(passwordResetEmail: string) {
        return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.afAuth.auth.signInWithPopup(provider)
            .then((credential) => {
                this.updateUserData(credential.user);
                this.router.navigate(['/map']);
            });
    }

    emailRegister(form: any) {
        const { email, password, phone, phoneNumberPrefix, name } = form;
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((credential: any) => {
            credential.user.name = name;
            credential.user.phone = phone ? `${phoneNumberPrefix} ${phone}` : '';
            this.updateUserData(credential.user).then(() => {
                this.router.navigate(['/map']);
            });
        });
    }

    private updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email,
            name: user.name || user.displayName || '',
            phone: user.phone || ''
        };
        return userRef.set(data, { merge: true });
    }

    signOut() {
        this.afAuth.auth.signOut().then(() => {
            this.ngZone.run(() => this.router.navigate(['/auth/login'])).then();
        });
    }
}
