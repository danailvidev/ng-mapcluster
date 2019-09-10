import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { firebase } from '@firebase/app';
import '@firebase/firestore';
import * as MarkerClusterer from '@google/markerclusterer';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'npo-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  map: google.maps.Map;
  markers: Array<any> = [];
  markerCluster: MarkerClusterer;
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  constructor(private authSvc: AuthService, private firestore: AngularFirestore, public router: Router) { }

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const center = new google.maps.LatLng(42.678551, 25.386633); // Buglaria

    const mapOptions: google.maps.MapOptions = {
      center,
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.authSvc.user$.pipe(take(1)).subscribe(user => {
      if (!user) {
        this.router.navigate(['/auth/login']);
        return;
      }

      const userRef = this.firestore.collection('users').doc(user.uid);

      userRef.get().toPromise().then((doc) => {
        if (doc.exists) {
          const location = doc.data().location;
          if (!location) {
            navigator.geolocation.getCurrentPosition((browserLocation) => {
              userRef.set({
                location: new firebase.firestore.GeoPoint(browserLocation.coords.latitude, browserLocation.coords.longitude)
              }, { merge: true }).then(() => {
                this.getAllUsersLocation();
              });
            }, (error) => {
              console.log(error);
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
  }

  // marker.addListener('click', (event: any) => {
  //   infowindow.setPosition(event.latLng);
  //   infowindow.setContent('<h2>Yes, I wanna be a donor!</h2>' +
  //     '<h3><a href="/add-donor/' + marker.getPosition().lat() + '/' + marker.getPosition().lng() + '">Register Here</a></h3>');
  //   infowindow.open(map, marker);
  // });


  getAllUsersLocation() {
    const query = firebase.firestore().collection('users');

    query.onSnapshot((querySnapshot) => {
      for (let mark of this.markers) {
        mark.setMap(null);
      }
      this.markers = [];
      if (this.markerCluster) this.markerCluster.clearMarkers();
      querySnapshot.forEach(x => {
        this.markers.push(this.createMarkers(x.data()));
      });
      const clusterOptions = { imagePath: 'assets/' };
      const markerCluster = new MarkerClusterer(this.map, this.markers, clusterOptions);
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
    if (!user.location || !user.location.latitude || !user.location.longitude) {
      return;
    }
    const iconBase = 'https://maps.google.com/mapfiles/ms/icons/';

    const latitude = parseFloat(user.location.latitude);
    const longitude = parseFloat(user.location.longitude);

    const userMarker = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      icon: iconBase + 'green-dot.png',
      title: user.email
    });

    let infoContent = '';

    if (user.name) {
      infoContent += `<h3>Име: ${user.name}</h3>`;
    }
    if (user.email) {
      infoContent += `<div><strong>Имейл: </strong>${user.email}</div>`;
    }
    if (user.phone) {
      infoContent += `<div><strong>Телефон: </strong>${user.phone}</div>`;
    }

    const infoMarkerwindow = new google.maps.InfoWindow({
      content: infoContent
    });

    google.maps.event.addListener(this.map, 'click', () => {
      infoMarkerwindow.close();
    });

    userMarker.addListener('click', () => {
      infoMarkerwindow.open(this.map, userMarker);
    });

    userMarker.addListener('dblclick', () => {
      infoMarkerwindow.open(this.map, userMarker);
    });

    return userMarker;

    // google.maps.event.addListener(donorMarker, 'click', function () {
    //   infowindow.setContent('<h3>' + place.name + '</h3><p>Phone number: ' + place.phone + '<br>Email: ' + place.email + '</p>');
    //   infowindow.open(map, this);
    // });
  }

}
