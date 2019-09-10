import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/auth/auth.service';
import * as firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
export class SettingsService {

    constructor(private afs: AngularFirestore) { }

    public updateUser(user: User) {
        const userRed = this.afs.collection('users').doc(user.uid);

        return userRed.update({
            name: user.name,
            phone: user.phone,
            info: user.info,
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
}
