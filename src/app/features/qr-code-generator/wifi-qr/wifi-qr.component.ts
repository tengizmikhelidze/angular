import { Component } from '@angular/core';
const QRCode = require('qrcode');
@Component({
  selector: 'app-wifi-qr',
  templateUrl: './wifi-qr.component.html',
  styleUrls: ['./wifi-qr.component.scss'],
})
export class WifiQrComponent {
  ssid: string = '';
  password: string = '';
  constructor() {}

  wifiQrGenerator(ssid: string, password: string) {
    let canvas = document.getElementById('wifi-canvas');
    QRCode.toCanvas(
      canvas,
      `WIFI:T:WPA;S:${ssid};P:${password};;`,
      function (err: any) {
        if (err) {
          alert('Failed While Generating Qr, \n Error: ' + err);
        }
      }
    );
  }
}
