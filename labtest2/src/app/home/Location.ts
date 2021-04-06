export class Location {
  id: string;
  latitude: any;
  longitude: any;
  date: any;

  constructor(id, latitude, longitude, date) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.date = date;
  }
}
