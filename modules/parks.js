'use strict';

const axios = require('axios');


async function getParks(request, response, next) {

  const state = request.query.state;
  console.log('state', state);
  const url = `https://developer.nps.gov/api/v1/parks?q=stateCode=${state}&limit=10&api_key=${process.env.NPS_API_KEY}`;
  //https://developer.nps.gov/api/v1/parks?q=Biking&stateCode=ca&limit=3&api_key=qwJ7GoP7sWgRkS1TYC5CuMo1LokSbs6UR9Hkc3pB
  // const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
  // https://api.themoviedb.org/3/search/movie?api_key=079169378594480c9faa05367e9900ab&language=en-US&query=Pittsburgh&page=1&include_adult=false

  try {
    const parksResponse = await axios.get(url);
    console.log(parksResponse);

    const dataToSend = parksResponse.data.data.map(object => {
      return new Parks(object);
    });

    response.status(200).send(dataToSend);

  } catch (error) {
    next(error);
  }

}


class Parks {
  constructor(parksObj) {
    this.parks = parksObj.fullName;
  }
}


module.exports = getParks;
