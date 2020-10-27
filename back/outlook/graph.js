// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

var graph = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

module.exports = {
  getUserDetails: async function(accessToken) {
    const client = getAuthenticatedClient(accessToken);

    const user = await client.api('/me').get();
    return user;
  },

  // <GetEventsSnippet>
  getEvents: async function(accessToken,calendarsid) {
    const client = getAuthenticatedClient(accessToken);

    const events = await client
      .api(`/me/calendars/${calendarsid}/calendarview?startDateTime=2020-10-27T10:00:00&endDateTime=2020-11-03T10:00:00`)
      .select('subject,organizer,start,end')
     // .orderby('createdDateTime DESC')
      .get();

    return events;
  },
  getCalendars: async function(accessToken) {
    const client = getAuthenticatedClient(accessToken);
 
    const events = await client
      .api(`/me/calendars`)
      .select('id')
     // .orderby('createdDateTime DESC')
      .get();
    return events;
  }

  
  // </GetEventsSnippet>
};

function getAuthenticatedClient(accessToken) {
  // Initialize Graph client
  const client = graph.Client.init({
    // Use the provided access token to authenticate
    // requests
    authProvider: (done) => {
      done(null, accessToken);
    }
  });

  return client;
}