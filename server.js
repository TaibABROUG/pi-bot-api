const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');
const lineReader = require('line-reader');
const fqaSchema = require("./models/Fqa");


// Express APIs
const apiAuth = require('./routes/auth.router');
const apiAgent = require('./routes/agent.router');
const apiIntent = require('./routes/intent.router');
const apiEntitie = require('./routes/entitie.router');
const apiKnownledge = require('./routes/knownledge.router');
const apiDatabase = require('./routes/database.router');
const returnAnswer = require('./controllers/returnAnswer.controller');
//const apichat = require('./routes/chat.router');
// MongoDB conection
//mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});//.then(() => {
// console.log('Database connected')
//},
// error => {
//   console.log("Database can't be connected: " + error)
// }
//)

// Remvoe MongoDB warning error
//mongoose.set('useCreateIndex', true);


// Express settings
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// Serve static resources
app.use('/public', express.static('public'));

app.use('/api/auth', apiAuth);
app.use('/api/agents', apiAgent);
app.use('/api/intents', apiIntent);
app.use('/api/entities', apiEntitie);
app.use('/api/knownledge', apiKnownledge);
app.use('/api/database', apiDatabase);
//app.use('/api/chat' , apichat);
// Define PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
let questions = [];
let answers = [];

// lineReader.eachLine('FQA.txt', function(line) {
//     console.log(line);
//     if (line.charAt(0) =='Q') {
//     questions.push(line.substring(3).trim().replace(/ +(?= )/g,''))  ;}
//     else  {answers.push(line.substring(3).trim().replace(/ +(?= )/g,''))  ;}
//     console.log(questions) ; 
//     console.log(answers) ; 
//     if (line.includes('STOP') ){
//         return false; // stop reading
//     }
// });
//console.log(similarity('gg hh hgh dfgfdg fgdfg' , 'gg hh ' ));

var socket = require('socket.io'), http = require('http'),
  socket = socket.listen(server);

socket.on('connection', function (connection) {
  console.log('User Connected');

  connection.on('message', async function (msg) {
    socket.emit('message', msg);
   // console.log(msg);
    //console.log((msg.split('#'))[1].replace(/ +(?= )/g, ''));
    //// indexofmaxsimilarquestion(questions , (msg.split('#'))[1]); 

    //const a= await  returnAnswer.returnAn(msg)  ; 
    // const a = gettherightanswer ( answers, questions , msg.split('#')[1]); 
    //  setTimeout(() => {    let a = returnAnswer.returnAn(msg)  ; console.log(a) ;   }, 1000);
    // let a = await fqaSchema.find({ id_agent: '5edbbb6e6daf3612e090c6f8' }, (error, data) => {
    //   if (error) {
    //     console.log("cant find  this agent's file");
    //   } else {
    //     console.log("this is what i found" + data[0].path);



    //   };






    // });
    //let path = a[0].path;

   // lineReader.eachLine('uploads/' + path, function (line) {
    //  // console.log(line);
    //   if (line.charAt(0) == 'Q') {
    //     questions.push(line.substring(3).trim().replace(/ +(?= )/g, ''));
    //   }
    //   else { answers.push(line.substring(3).trim().replace(/ +(?= )/g, '')); }
    //   //  console.log(questions) ; 
    //   // console.log(answers) ; 
    //   if (line.includes('STOP')) {
    //     return false; // stop reading
    //   }
    // })
   // let ab = gettherightanswer(answers, questions, msg.split('#')[1]);
    // console.log ( "answer===  " + ab)         ;
//     await returnAnswer.returnAn(msg).then((resultat) =>{
//      socket.emit('message', resultat);
//     //  socket.emit('message', "bot#ggggg" ,resultat);
//  // console.log("resultat = " , resultat)
// });
await returnAnswer.returnAn(msg).then((resultat) =>{
  socket.emit('message', resultat);
 //  socket.emit('message', "bot#ggggg" ,resultat);
// console.log("resultat = " , resultat)
});

   // console.log("ac = ", ac);
    
  });
});



// Express error handling
// app.use((req, res, next) => {
//     setImmediate(() => {
//         next(new Error('Something went wrong'));
//     });
// });

// app.use(function (err, req, res, next) {
//     console.error(err.message);
//     if (!err.statusCode) err.statusCode = 500;
//     res.status(err.statusCode).send(err.message);
// });

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
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  let costs = new Array();
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
function indexofmaxsimilarquestion(q, msg) {
  msg = msg.toLowerCase().trim().replace(/ +(?= )/g, '');
  let ts = [];
  q.forEach(element => {
    ts.push(similarity(element, msg))
  });
 // console.log(ts);

  var max = ts[0];
  var maxIndex = 0;

  for (var i = 1; i < ts.length; i++) {
    if (ts[i] > max) {
      maxIndex = i;
      max = ts[i];
    }
  }
//  console.log(max, "   : ", q[maxIndex]);
  if (max > 0.8) { return maxIndex + 1; }
  else {
    if (max > 0.5) {
      return ((maxIndex + 1) * -1);
    }
    else {
      return (0);
    }
  }
}
function gettherightanswer(a, q, msg) {
  let res = indexofmaxsimilarquestion(q, msg)
  console.log(res);
  if (!res) { return "Je ne suis pas en mesure de tout comprendre mais je m’améliore d’une façon continue à l'aide de l'intelligence artificielle "; }
  else {
    if (res < 0) { return "veux-tu dire: " + q[res * -1 - 1] }
    else {
      return a[res - 1];
    }


  }

}
