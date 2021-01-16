

// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


let IP;///to be taken from fetchMyIPlog() and to be passed to fetchCoordsbyIPlog.
//to be taken by the ISSFlyinOverTimes function

// ///fetchMyIPLog
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
//   IP = ip
// });

// //fetchCoordsByIPLog
// fetchCoordsByIP( IP, (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error);
    
//     return;
//   }
//   console.log('It worked! Returned Coords:' , coords);
  
//   coordObj = coords;
//   console.log(coordObj)
//   return coordObj
// })

//fetchISSFlyOverTimeslog

// fetchISSFlyOverTimes(coordObj, (error, info) => {
//   if (error) {
//     console.log("It didn't work!" , error);
    
//     return;
//   }

//   console.log('It worked! Returned flyover times:' , info);
  
//   console.log(info)
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});

// eslint-disable-next-line no-undef
// module.exports = { fetchMyIP };