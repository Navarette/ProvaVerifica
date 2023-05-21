import { AfterViewInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps'
import { GEOJSON, GeoFeatureCollection } from './models/geojson.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'server mappe';
  //Aggiungiamo latitudine e longitudine di un luogo
  center: google.maps.LatLngLiteral = { lat: 45.506738, lng: 9.190766 };
  geoJsonObject!: GeoFeatureCollection;
  fillColor: string = "#FF0000";  //Colore delle zone catastali

  markerList: google.maps.MarkerOptions[] = [];
  zoom = 8;

  constructor() {
    //Questi dati dovremmo scaricarli dal server, per ora li abbiamo copiati nel file     gojson.model.ts
    this.geoJsonObject = GEOJSON;
    console.log(this.geoJsonObject); //stampo l'oggetto geoJsonObject sulla console

    this.markerGenerator()
    // let iconData: google.maps.Icon = {
    //   url: '/assets/img/cat_acrobat.ico',
    //   scaledSize: new google.maps.Size(60, 60)
    // }

    // this.markerOptions = { icon: iconData }
    // this.vertices = [
    //   { lat: this.center.lat + 0.001, lng: this.center.lng - 0.002 },
    //   { lat: this.center.lat, lng: this.center.lng },
    //   { lat: this.center.lat - 0.001, lng: this.center.lng - 0.002 }
    // ];
  }

  @ViewChild('mapRef')
  mapRef!: GoogleMap;
  ngAfterViewInit() {
    this.mapRef.data.addGeoJson(this.geoJsonObject);
    this.mapRef.data.setStyle(this.styleFunc)

  }
  styleFunc = (feature: any) => {
    console.log(feature.h.id)
    let newColor = "#FF0000"; //RED
    if (feature.h.id == 0) newColor = "#00FF00"; //GREEN
    else newColor = "#0000FF"; //BLUE
    return ({
      clickable: false,
      fillColor: newColor,
      strokeWeight: 1
    });
  }
  markerGenerator() {
    for (let feature of this.geoJsonObject.features) {
      this.markerList.push({
        position: {
          lng: feature.geometry.coordinates[0][0][0],
          lat: feature.geometry.coordinates[0][0][1]
        },
        label: String(feature.properties.id),
      })
    }
    // this.markerList = [
    //   {
    //     position: {
    //       lng: this.geoJsonObject.features[0].geometry.coordinates[0][0][0],
    //       lat: this.geoJsonObject.features[0].geometry.coordinates[0][0][1]
    //     },
    //     label: String(this.geoJsonObject.features[0].properties.id),
    //   },
    //   {
    //     position: {
    //       lng: this.geoJsonObject.features[1].geometry.coordinates[0][0][0],
    //       lat: this.geoJsonObject.features[1].geometry.coordinates[0][0][1]
    //     },
    //     label: String(this.geoJsonObject.features[1].properties.id),
    //   },
    // ]

  }



}