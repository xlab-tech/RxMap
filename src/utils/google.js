import GoogleMapsLoader from 'google-maps';

let _google;

export const loadGoogle = key => new Promise((resolve) => {
  GoogleMapsLoader.KEY = key;
  GoogleMapsLoader.VERSION = '3.34';
  GoogleMapsLoader.load((google) => {
    _google = google;
    resolve(google);
  });
});
const getGoogleMap = () => _google.maps;

export default getGoogleMap;
