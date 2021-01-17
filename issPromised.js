const request = require('request-promise-native');

let fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = function(body) {
  let ip  = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body){

  const coords = JSON.parse(body); 
  
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  return request(url);
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);

      let output = ()=>{
        console.log('It worked! Returned the next flyover times:');
        response.forEach((i) =>{
          let datetime = new Date(0);
          datetime.setUTCSeconds(i.risetime);
          let duration = i.duration;
          console.log(`Next pass at ${datetime} for ${duration} seconds!`); 
        })
      }
      return output();
    });
}


module.exports = { nextISSTimesForMyLocation} ;