import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
