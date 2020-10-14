# Smart_Mirror BACK 



## Installation

Run `npm install` to install all the dependencies

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Production server

Run `npm run start` for a production server. Navigate to `http://localhost:3000/`

## Google Calendar API

Go to this URL https://developers.google.com/calendar/quickstart/nodejs to enable the Calendar API on your Google account then download and paste your file `credentials.json` in the back folder of this project.

Run the server and go to `http://localhost:3000/api/google_calendar`. Now in the console copy and paste the given link in your web browser to obtain your unique code. Then paste it on the console and push enter. A new file is created called `token.json`. You can now go back on `http://localhost:3000/api/google_calendar` to have your calendar in json.

