const request = require('request');

///fetch ip function implementation
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

///fetch coords function implementation
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


//////pass overhead function implementation
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = (coords, callback) =>{

  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  request(url, (error, response, body) => {

  //handle error if error
    if (error) return callback(error, null);


    ///handle error if bad status code (!==200)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass Times: ${body}`
      callback(Error(msg), null);
      return;
    }
    ///if all good
    const info = JSON.parse(body);
    const passes = info.response;
    // console.log(passes);
    callback(null, passes);
  })
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!" , error);
      return error
    }
    let IP = ip

    fetchCoordsByIP( IP, (error, coords) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      // console.log('It worked! Returned Coords:' , coords);
      
      coordObj = coords;
      console.log(coordObj)
      // coordObj
      fetchISSFlyOverTimes(coordObj, (error, info) => {
        if (error) {
          console.log("It didn't work!" , error);
            
          return;
        }
        console.log('It worked! Returned the next flyover times:');

        info.forEach((i) =>{
          let datetime = new Date(0);
          datetime.setUTCSeconds(i.risetime);
          let duration = i.duration;
          console.log(`Next pass at ${datetime} for ${duration} seconds!`); 
        })
        // console.log(info);
      });
    })
  });
}
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation }; 
  
  
