// Custom packages
const utils = require("./utils");

const welcome = (agent) => {
  agent.add(`Welcome to Team 11's Virtual Assistant!`);
};

const fallback = (agent) => {
  agent.add(`I didn't understand`);
  agent.add(`I'm sorry, can you try again?`);
  agent.add(`I'm sorry, can you repeat your query?`);
};

const coursesIntent = async (agent) => {
  const preReqJson = await fs.readFile("./prerequisites.json", {
    encoding: "utf8",
  });
  const coursesJson = await fs.readFile("./courses.json", {
    encoding: "utf8",
  });

  //Here we get the type of the utterance
  const courses = agent.parameters.courses;
  const branch = agent.parameters.branch;
  const department = agent.parameters.department;
  const type = agents.parameter.type;
  const subject = agents.parameter.subject;

  let resp = "";
  if (type == "prerequisites") {
    resp = utils.extractResponseFromJson({ subject }, preReqJson);
  } else {
    resp = utils.extractResponseFromJson(
      { courses, branch, department },
      coursesJson
    );
  }

  agent.add(resp);
};

module.exports = { welcome, fallback, coursesIntent };
