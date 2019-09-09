
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

export interface User {
    uid: string;
    email: string;
    phone: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user$: Observable<User>;

    constructor(
        private afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router) {
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
        const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        if (result) {
            this.router.navigate(['/map']);
        }
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
        const { email, password, phone, phoneNumberPrefix } = form;
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((credential: any) => {
            credential.user.phone = `${phoneNumberPrefix} ${phone}`;
            this.updateUserData(credential.user);
        });
    }

    private updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const data: User = {
            uid: user.uid,
            email: user.email,
            phone: user.phone || ''
        };
        return userRef.set(data, { merge: true });
    }

    signOut() {
        this.afAuth.auth.signOut().then( () => {
            this.router.navigate(['/auth/login']);
        });
    }
}
