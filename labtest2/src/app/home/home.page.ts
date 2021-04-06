import {Component} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Plugins} from '@capacitor/core';
import {Location} from './Location';

const {Storage} = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  locations: Location[];
  latitude: any = 0; // latitude
  longitude: any = 0; // longitude
  date: any = '';

  constructor(private geolocation: Geolocation) {
    this.getCurrentCoordinates();
    this.readLocations();
  }

  async getCurrentCoordinates() {
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.date = new Date().toDateString();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getGeoInfo() {
    console.log('latitude', this.latitude);
    console.log('longitude', this.longitude);
    console.log('locations', this.locations);
  }

  async setObject(key: string, value: any): Promise<any> {
    await Storage.set({
      key,
      value: JSON.stringify(value)
    });
  }

  async addLocation() {
    const location = new Location(Date.now(), this.latitude, this.longitude, this.date);
    this.setObject(JSON.stringify(location.id), location);
    this.readLocations();
  }

  async clearLocations() {
    await Storage.clear();
    this.locations = [];
  }

  async deleteLocation(id: string) {
    await Storage.remove({key: id});
    this.readLocations();
  }

  async readLocations(): Promise<any> {
    this.locations = [];
    const {keys} = await Storage.keys();
    keys.forEach(this.getNote, this);
  }

  async getNote(key: string): Promise<any> {
    const item = await Storage.get({key});
    const location = JSON.parse(item.value);
    this.locations.push(location);
  }
}
