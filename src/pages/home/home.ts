import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  image: string = null;
  latitude: any;
  longitude: any;
  foto: boolean = false;

  constructor(public navCtrl: NavController, private camera: Camera, public geo: Geolocation, public http:Http) {

  }

  
  ionViewDidLoad(){
    this.geo.getCurrentPosition().then( pos => {
      this.latitude = pos.coords.latitude;
      this.longitude = pos.coords.longitude;
    }).catch( err => console.log(err));
  }

  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.foto = true;

    })
    .catch(error =>{
      console.error( error );
    });
  }

  enviarAlerta(){


    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
      
    // headers.append('Content-Type', 'application/json');
    let data = JSON.stringify({alert:{latitude: this.latitude, longitude:this.longitude, imagen: this.image}});
    this.http.post('https://enigmatic-river-76573.herokuapp.com/api/alerts',data, options)
    .map(res => res.json())
    .subscribe(res => {
      alert('enviado correctamente');
      this.navCtrl.push(HomePage);
    }, (err) => {
      alert("Error");
    });

  }



}
