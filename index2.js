
const { nextISSTimesForMyLocation} = require(`./issPromised`);


nextISSTimesForMyLocation()
  .then((passTimes) => {
    console.log(passTimes);
  })

