import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

declare var google;

export interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  id: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  map = null;
  private ngFirestoreCollection: AngularFirestoreCollection<Marker>;

  constructor(private angularFirestore: AngularFirestore) {
    this.ngFirestoreCollection = angularFirestore.collection<Marker>('markers');
    this.ngFirestoreCollection.valueChanges().subscribe(res => {
      res.forEach(marker => {
        this.addMarker(marker);
      });
    });
  }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: -0.1859053, lng: -78.7107479};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 10
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

}
