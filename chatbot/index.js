// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";

const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");

//Added for tutorial
const axios = require("axios");

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log(
      "Dialogflow Request headers: " + JSON.stringify(request.headers)
    );
    console.log("Dialogflow Request body: " + JSON.stringify(request.body));

    function welcome(agent) {
      agent.add(`Welcome to Team 11's Virtual Assistant!`);
    }

    function fallback(agent) {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
      agent.add(`I'm sorry, can you repeat your query?`);
    }

    function coursesIntent(agent) {
      //Here we get the type of the utterance
      const courses = agent.parameters.courses;
      const branch = agent.parameters.branch;
      const department = agent.parameters.department;
      const type = agents.parameter.type;

      if (type == "list" && category == "drivers") {
        return axios({
          method: "GET",
          url: `http://ergast.com/api/f1/drivers.json`,
          data: "",
        })
          .then((response) => {
            var json = response.data.MRData.DriverTable;
            const driverNames = JSON.stringify(
              json.Drivers.map(
                (row) =>
                  `${row.givenName} ${row.familyName}, ${row.nationality}`
              )
            );
            agent.add(`The details of the drivers are ${driverNames}`);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Default Fallback Intent", fallback);
    intentMap.set("CoursesIntent", coursesIntent);
    agent.handleRequest(intentMap);
  }
);
