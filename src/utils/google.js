import GoogleMapsLoader from 'google-maps'; // only for common js environments
let _google;

export const loadGoogle = key => new Promise((resolve, reject) => {
    GoogleMapsLoader.KEY = key;
    GoogleMapsLoader.load((google) => {
        _google = google;
        resolve(google);
    });
});
const getGoogleMap = () => _google.maps;

export default getGoogleMap;