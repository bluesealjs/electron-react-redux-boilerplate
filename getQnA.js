const path = require("path");
const tfn = require("@tensorflow/tfjs-node");
const qna = require("@tensorflow-models/qna");
require("@tensorflow/tfjs-core");
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");

const MODEL_URL = tfn.io.fileSystem("./qna-models/model.json");
let folder = process.cwd();
let modelPromise = {};
// const MODEL_URL = path.join(__dirname, "/qna-models/model.json");
// const MODEL_URL = "file://" + folder + "/qna-models/model.json";
// const MODEL_URL = path.resolve("/qna-models/model.json");

console.log({ MODEL_URL });
// const MODEL_URL = "https://tfhub.dev/tensorflow/tfjs-model/mobilebert/1";

const MODEL_URL2 =
  "https://test-ridgeind-test.s3.ap-south-1.amazonaws.com/tf-qna-models/";
const init = async () => {
  modelPromise = await qna.load({ modelUrl: MODEL_URL });
};
init();
const getQnA = async (ques, text) => {
  console.log({ ques, text });
  let answers;
  try {
    const model = await modelPromise;
    const tempAnswers = await model.findAnswers(ques, text);

    answers = tempAnswers
      .map((answer) => answer.text + " (score =" + answer.score + ")")
      .join("\n\n");

    console.log({ answers: tempAns });
  } catch (err) {
    console.log("err: ", err.message);
  }

  return answers;
};

module.exports = getQnA;
