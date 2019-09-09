import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as firebase from 'firebase/app';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

declare var google: any;
let map: any;
let marker: any;
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
let infowindow: any;
const iconBase = 'http://maps.google.com/mapfiles/ms/icons/';

@Component({
  selector: 'npo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  constructor(private authSvc: AuthService, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    navigator.geolocation.getCurrentPosition((browserLocation) => {
      map = new google.maps.Map(this.mapElement.nativeElement, {
        center: { lat: browserLocation.coords.latitude, lng: browserLocation.coords.longitude },
        zoom: 15
      });

      this.authSvc.user$.pipe(take(1)).subscribe(user => {
        const userRef = this.firestore.collection('users').doc(user.uid);

        userRef.get().toPromise().then((doc) => {
          if (doc.exists) {
            let location = doc.data().location;
            if (!location) {
              userRef.set({
                location: new firebase.firestore.GeoPoint(browserLocation.coords.latitude, browserLocation.coords.longitude)
              }, { merge: true }).then(() => {
                this.getAllUsersLocation();
              });
            } else {
              // already has location TODO: update ?
              this.getAllUsersLocation();
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });
      });


      // infowindow = new google.maps.InfoWindow();

      // marker = new google.maps.Marker({
      //   position: { lat: location.coords.latitude, lng: location.coords.longitude },
      //   map,
      //   title: 'Click to zoom',
      //   icon: iconBase + 'blue-dot.png'
      // });

      // map.addListener('center_changed', () => {
      //   window.setTimeout(() => {
      //     map.panTo(marker.getPosition());
      //   }, 3000);
      // });

      // marker.addListener('click', (event: any) => {
      //   infowindow.setPosition(event.latLng);
      //   infowindow.setContent('<h2>Yes, I wanna be a donor!</h2>' +
      //     '<h3><a href="/add-donor/' + marker.getPosition().lat() + '/' + marker.getPosition().lng() + '">Register Here</a></h3>');
      //   infowindow.open(map, marker);
      // });
    }, (error) => {
      console.log(error);
    }, options);
  }

  getAllUsersLocation() {
    const query = firebase.firestore().collection('users');

    query.onSnapshot((querySnapshot) => {
      querySnapshot.forEach(x => {
        this.createMarkers(x.data());
      });
    }, (error) => {
      console.log(error);
    });

    // firebase.database().ref('users/').on('value', resp => {
    //   let users = [];
    //   console.log(resp);
    //   users = this.snapshotToArray(resp);
    //   for (const user of users) {
    //     this.createMarkers(user);
    //   }
    // });
  }

  snapshotToArray = (snapshot: any) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  }

  createMarkers(user: any) {
    const latitude = parseFloat(user.location.latitude);
    const longitude = parseFloat(user.location.longitude);
    const userMarker = new google.maps.Marker({
      map,
      position: { lat: latitude, lng: longitude },
      icon: iconBase + 'green-dot.png',
      title: user.email
    });

    infowindow = new google.maps.InfoWindow({
      content: `
      <h3>Име: ${user.name}</h3>
      <strong>Имейл: </strong>${user.email}
      <br>
      <strong>Телефон: </strong>${user.phone}
      `
    });

    userMarker.addListener('click', () => {
      infowindow.open(map, userMarker);
    });

    userMarker.addListener('dblclick', () => {
      infowindow.open(map, userMarker);
    });



    // google.maps.event.addListener(donorMarker, 'click', function () {
    //   infowindow.setContent('<h3>' + place.name + '</h3><p>Phone number: ' + place.phone + '<br>Email: ' + place.email + '</p>');
    //   infowindow.open(map, this);
    // });
  }

}
