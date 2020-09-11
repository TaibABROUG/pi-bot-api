const fqaSchema = require("../models/Fqa");
const intentSchema = require("../models/Intent");
const express = require("express");
const lineReader = require("line-reader");
const { promises } = require("fs-extra");
async function getquestions(path) {
  let questions = [];
  console.log("iciiiiiiiiiiiii", path);
  return new Promise((resolve) => {
    lineReader.eachLine("uploads/" + path, function (line) {
      console.log("fonction", line);
      if (line.charAt(0) == "Q") {
        questions.push(
          line
            .substring(3)
            .trim()
            .replace(/ +(?= )/g, "")
        );
      }

      //  console.log(questions) ;
      // console.log(answers) ;
      if (line.includes("STOP")) {
        return false; // stop reading
      }
    });

    resolve(questions);
  });
}
async function getanswers(path) {
  let answers = [];
  return new Promise((resolve) => {
    lineReader.eachLine("uploads/" + path, function (line) {
      console.log("fonction", line);
      if (line.charAt(0) == "R") {
        answers.push(
          line
            .substring(3)
            .trim()
            .replace(/ +(?= )/g, "")
        );
      }

      //  console.log(questions) ;
      // console.log(answers) ;
      if (line.includes("STOP")) {
        return false; // stop reading
      }
    });

    resolve(answers);
  });
}
async function getquestionsanswersintent(info) {
  let questionsanswers = [];
  let answers = [];
  return new Promise((resolve) => {
    info.forEach((element) => {
      console.log("fonction", element);
      let answersElement = element.content.answers.split("||");
      questionsanswers.push({
        ques: element.content.desc.trim().replace(/ +(?= )/g, ""),
        ans:
          answersElement[Math.floor(Math.random() * questionsElement.length)],
      });
      let questionsElement = element.content.synonymes.split("||");
      questionsElement.forEach((elem) => {
        questionsanswers.push({
          quest: elem.trim().replace(/ +(?= )/g, ""),
          ans:
            answersElement[Math.floor(Math.random() * questionsElement.length)],
        });
      });

      console.log(questionsanswers);
      // console.log(answers) ;
    });

    resolve(questionsanswers);
  });
}
async function getanswersintent(info) {
  let answers = [];
  return new Promise((resolve) => {
    info.forEach((element) => {
      console.log("fonction", element);
      if (line.charAt(0) == "R") {
        answers.push(
          line
            .substring(3)
            .trim()
            .replace(/ +(?= )/g, "")
        );
      }

      //  console.log(questions) ;
      // console.log(answers) ;
      if (line.includes("STOP")) {
        return false; // stop reading
      }
    });

    resolve(answers);
  });
}
module.exports = {
  returnAn: async function (msg) {
    let questions = [];
    let answers = [];

    let info = await fqaSchema.find(
      { id_agent: msg.split("|")[0] },
      (error, data) => {
        if (error) {
          console.log("cant find  this agent's file", msg.split("#")[1]);
        } else {
          console.log("this is what i found" + data[0].path);
        }
      }
    );

    return new Promise((resolve) => {
        let path= info[0].path;
      getquestions(path).then((res) => {
        setTimeout(function () {
            console.log("quest",res);
          questions = res;
        }, 500);
      });
      getanswers(path).then((res) => {
        setTimeout(function () {console.log("answers",res);
          answers = res;
        }, 500);
      });
      //     lineReader.eachLine('uploads/' + path, function (line) {
      //     console.log(line);
      //     if (line.charAt(0) == 'Q') {
      //         questions.push(line.substring(3).trim().replace(/ +(?= )/g, ''));
      //     }
      //     else { answers.push(line.substring(3).trim().replace(/ +(?= )/g, '')); }
      //     //  console.log(questions) ;
      //     // console.log(answers) ;
      //     if (line.includes('STOP')) {
      //         return false; // stop reading
      //     }
      // });
      setTimeout(function () {
        let a = gettherightanswer(answers, questions, msg.split("#")[1]);
        console.log("answer===  " + a);

        resolve(
          "bot" +
            msg.split("|")[0] +
            "|" +
            msg.split("#")[0].split("|")[1] +
            "#" +
            a
        );
      }, 1000);
    });
  },

  returnAnFromIntent: async function (msg) {
    let questions = [];
    let answers = [];
    let questionsanswers = [];

    let info = await intentSchema.find(
      { id_agent: msg.split("|")[0] },
      (error, data) => {
        if (error) {
          console.log("cant find  this agent's file", msg.split("#")[1]);
        } else {
          console.log("this is what i found" + data[0].path);
        }
      }
    );

    return new Promise((resolve) => {
      let path = info[0].path;
      getquestionsanswersintent(info).then((res) => {
        setTimeout(function () {
          questionsanswers = res;
        }, 500);
      });

      //     lineReader.eachLine('uploads/' + path, function (line) {
      //     console.log(line);
      //     if (line.charAt(0) == 'Q') {
      //         questions.push(line.substring(3).trim().replace(/ +(?= )/g, ''));
      //     }
      //     else { answers.push(line.substring(3).trim().replace(/ +(?= )/g, '')); }
      //     //  console.log(questions) ;
      //     // console.log(answers) ;
      //     if (line.includes('STOP')) {
      //         return false; // stop reading
      //     }
      // });
      setTimeout(function () {
        let a = gettherightanswerintent(questionsanswers, msg.split("#")[1]);
        console.log("answer===  " + a);

        resolve(
          "bot" +
            msg.split("|")[0] +
            "|" +
            msg.split("#")[0].split("|")[1] +
            "#" +
            a
        );
      }, 1000);
    });
    // whatever
  },
};
function getfilefromagent(id_agent) {}

//**************Levenshtein distance*************/

function similarity(s1, s2) {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  let longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  let costs = new Array();
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
function indexofmaxsimilarquestion(q, msg) {
  msg = msg
    .toLowerCase()
    .trim()
    .replace(/ +(?= )/g, "");
  let ts = [];
  q.forEach((element) => {
    ts.push(similarity(element, msg));
  });
  console.log(ts);

  var max = ts[0];
  var maxIndex = 0;

  for (var i = 1; i < ts.length; i++) {
    if (ts[i] > max) {
      maxIndex = i;
      max = ts[i];
    }
  }
  console.log(max, "   : ", q[maxIndex]);
  if (max > 0.8) {
    return maxIndex + 1;
  } else {
    if (max > 0.5) {
      return (maxIndex + 1) * -1;
    } else {
      return 0;
    }
  }
}
function gettherightanswer(a, q, msg) {
  let res = indexofmaxsimilarquestion(q, msg);
  console.log("answer", a);
  if (!res) {
    return "Je ne suis pas en mesure de tout comprendre mais je m’améliore d’une façon continue à l'aide de l'intelligence artificielle ";
  } else {
    if (res < 0) {
      return "veux-tu dire: " + q[res * -1 - 1];
    } else {
      return a[res - 1];
    }
  }
}
function gettherightanswerintent(aq, msg) {
  let res = indexofmaxsimilarquestionintent(aq, msg);
  console.log("answer", aq);
  if (!res) {
    return "Je ne suis pas en mesure de tout comprendre mais je m’améliore d’une façon continue à l'aide de l'intelligence artificielle ";
  } else {
    if (res < 0) {
      return "veux-tu dire: " + aq[res * -1 - 1].quest;
    } else {
      return aq[res - 1].ans;
    }
  }
}
function indexofmaxsimilarquestionintent(aq, msg) {
  msg = msg
    .toLowerCase()
    .trim()
    .replace(/ +(?= )/g, "");
  let ts = [];
  aq.forEach((element) => {
    ts.push(similarity(element.quest, msg));
  });
  console.log(ts);

  var max = ts[0];
  var maxIndex = 0;

  for (var i = 1; i < ts.length; i++) {
    if (ts[i] > max) {
      maxIndex = i;
      max = ts[i];
    }
  }
  console.log(max, "   : ", q[maxIndex]);
  if (max > 0.8) {
    return maxIndex + 1;
  } else {
    if (max > 0.5) {
      return (maxIndex + 1) * -1;
    } else {
      return 0;
    }
  }
}
