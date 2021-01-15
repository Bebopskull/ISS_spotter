const request = require('request');


const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;///fecht the IP value from the parsed JSON

    callback(null, ip);
  });
};


const fetchCoordsByIP = (ip, callback) =>{
  request(`https://freegeoip.app/json/`, (error, response, body) => {

  //handle error if error
    if (error) return callback(error, null);


    ///handle error if bad status code (!==200)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP: ${body}`
      callback(Error(msg), null);
      return;
    }
    ///if all good
    const info = JSON.parse(body);
    const latitude = info.latitude;
    const longitude = info.longitude;
    const coords = { latitude, longitude }
    callback(null, coords);
  })
};

module.exports = { fetchMyIP,fetchCoordsByIP }; 
  
  
