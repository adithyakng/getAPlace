// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";

const preReqJson = [
  {
    key: {
      subject: "ml",
    },
    responseMessage:
      "prerequisite course is mathematics for intelligent system",
  },
  {
    key: {
      subject: "ads",
    },
    responseMessage: "data structures or equivalent course in under graduation",
  },

  {
    key: {
      subject: "hci",
    },
    responseMessage: "This course doesnt have any prerequisites",
  },
  {
    key: {
      subject: "acn",
    },
    responseMessage:
      "A computer networks equivalent course in undergraduation in a prerequisite for this course",
  },
  {
    key: {
      subject: null,
    },
    responseMessage: "We don't have any information regarding this course",
  },
];

const coursesJson = [
  {
    key: {
      type: "popular",
      courses: "course",
      branch: "department",
      department: "computer science",
    },
    responseMessage:
      "Popular courses are Advanced Data Structures (ADS), Human Computer Interaction (HCI), Analysis of Algorithm (AOA), Distributed Operating System Principles (DOSP), Machine Learning (ML)",
  },

  {
    key: {
      type: "mandatory",
      courses: "course",
      branch: "department",
      department: "computer science",
    },
    responseMessage: "Mandatory core course is Analysis of Algorithms (AOA)",
  },

  {
    key: {
      type: "tough",
      courses: "course",
      branch: "department",
      department: "computer science",
    },
    responseMessage:
      "Tough courses in CS major are Machine Learning (ML), Mathematics for Intelligence Systems (MIS), Analysis of Algorithms (AOA)",
  },
];

// Built in packages
const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

const extractResponseFromJson = (keyData, data) => {
  for (let i = 0; i < data.length; i++) {
    let isValid = true;
    for (const [name, value] of Object.entries(keyData)) {
      if (data[i].key[name] !== value) {
        isValid = false;
      }
    }

    if (isValid) {
      return data[i].responseMessage;
    }
  }

  return "Sorry! we couldn't find the requested information right now. Please try again later!";
};

const welcome = (agent) => {
  agent.add(`Welcome to Team 11's Virtual Assistant!`);
};

const fallback = (agent) => {
  agent.add(`I didn't understand`);
  agent.add(`I'm sorry, can you try again?`);
  agent.add(`I'm sorry, can you repeat your query?`);
};

const coursesIntent = (agent) => {
  //Here we get the type of the utterance
  const courses = agent.parameters.courses;
  const branch = agent.parameters.branch;
  const department = agent.parameters.department;
  const type = agent.parameters.type;
  const subject = agent.parameters.subject;

  let resp = "";
  if (type == "prerequisite") {
    resp = extractResponseFromJson({ subject }, preReqJson);
  } else {
    resp = extractResponseFromJson(
      { courses, branch, department },
      coursesJson
    );
  }

  agent.add(resp);
};

function mapToI20Intent(agent) {
  let i20 = agent.parameters.i20;
  let advisor = agent.parameters.advisor;

  if (i20) {
    let s =
      "All I20 related topics are managed by International Student Center at University of Florida";
    s += "The website address is https://internationalcenter.ufl.edu/";
    agent.add(s);
    return;
  } else if (advisor) {
    let s =
      "International Student Advisors are based on the first letter of your name. Here are the details";
    let k = `
            For A, B, X Ms. Gardenia Bazán
            For C, D, E, F  Ms. Danielle Black
            For G, H    Ms. Ethel Porras
            For I, J, K, U, V   Ms. Tikia Brown
            For L, N, O Mr. Steve Ghulamani
            For M, P, Q     Ms. Candice DeBose-Tyson
            For R, S, T; All Athletes   Mr. Yu Aoyagi
            For W, Y, Z     Mr. Alvin Johnson, Jr.`;

    agent.add(s + k);
  }
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log(
      "Dialogflow Request headers: " + JSON.stringify(request.headers)
    );
    console.log("Dialogflow Request body: " + JSON.stringify(request.body));

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Default Fallback Intent", fallback);
    intentMap.set("CoursesIntent", coursesIntent);
    intentMap.set("I20Intent", mapToI20Intent);

    agent.handleRequest(intentMap);
  }
);
