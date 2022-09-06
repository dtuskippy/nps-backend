'use strict';

const axios = require('axios');

async function getParks(request, response, next) {

  const state = request.query.state;
  const activities = request.query.activities;

  const limit = 50;
  console.log('state', state);
  const url = `https://developer.nps.gov/api/v1/parks?stateCode=${state}&limit=${limit}&api_key=${process.env.NPS_API_KEY}`;
  //https://developer.nps.gov/api/v1/parks?q=Biking&stateCode=ca&limit=3&api_key=qwJ7GoP7sWgRkS1TYC5CuMo1LokSbs6UR9Hkc3pB

  try {
    const parksResponse = await axios.get(url);

    const dataToSend = parksResponse.data.data.filter(park => {
      return park.activities.some(activity => {
        return activity.name === activities;
      });
    }).map(object => {
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
