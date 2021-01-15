import { fetchMyIP } from './iss';
import { fetchCoordsByIP } from './iss';

// const  { fetchMyIP }  = require('./iss');
let IP;///to be taken from fetchMyIPlog() and to be passed to fetchCoordsbyIPlog.


///fetchMyIPLog
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
  IP = ip
});

//fetchCoordsByIPLog
fetchCoordsByIP( IP, (error, coords) => {
  if (error) {
    console.log("It didn't work!" , error);
    
    return;
  }


  console.log('It worked! Returned Coords:' , coords);

})


// eslint-disable-next-line no-undef
export default { fetchMyIP };