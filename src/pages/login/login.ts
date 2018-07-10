import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: any;
  email: any;
  password: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  validateLogin(){


    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
      
    // headers.append('Content-Type', 'application/json');
    let data = JSON.stringify({email: this.email, password:this.password});
    this.http.post('https://enigmatic-river-76573.herokuapp.com/api/users',data, options)
    .map(res => res.json())
    .subscribe(res => {
      
      this.navCtrl.push(HomePage);
    }, (err) => {
      alert("failed");
    });

  }
 

}
