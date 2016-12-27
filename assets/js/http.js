export const API_KEY = 'YOUR_API_KEY_HERE';

export class Http {
  static fetchData (url) {
    return new Promise((resolve, reject) => {
      const HTTP = new XMLHttpRequest();

      HTTP.responseType = 'json';
      HTTP.open('GET', url);
      HTTP.send();

      HTTP.onload = function () {
        resolve(this.response);
      }

      HTTP.onerror = function () {
        reject('Something went wrong...');
      }
    });
  }
}
