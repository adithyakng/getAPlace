// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";

// Built in packages
const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");

// Custom packages
const utils = require("./utils");
const intentHandlers = require("./intentHandlers");

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  async (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log(
      "Dialogflow Request headers: " + JSON.stringify(request.headers)
    );
    console.log("Dialogflow Request body: " + JSON.stringify(request.body));

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", intentHandlers.welcome);
    intentMap.set("Default Fallback Intent", intentHandlers.fallback);
    intentMap.set("CoursesIntent", intentHandlers.coursesIntent);
    agent.handleRequest(intentMap);
  }
);
