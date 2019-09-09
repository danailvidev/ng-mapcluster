import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

const firebaseConfig = {
  apiKey: 'AIzaSyBGfbFGm-4kKEk-rfjdmY8qMMZqZT25HWE',
  authDomain: 'ng-mapcluster.firebaseapp.com',
  databaseURL: 'https://ng-mapcluster.firebaseio.com',
  projectId: 'ng-mapcluster',
  storageBucket: 'ng-mapcluster.appspot.com',
  messagingSenderId: '30322919836',
  appId: '1:30322919836:web:4a9e0b9ed1bd3f606a2059'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NzMessageModule,
    NzButtonModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
