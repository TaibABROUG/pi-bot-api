const brain= require('brain.js');
const net = new brain.recurrent.RNN();
const config = {
    iterations: 2000,
   // log: true,
    logPeriod: 1,
    layers: [10]
  };

net.train([
  { input: 'bonjour', output: 'salut' },
  { input: 'hi', output: 'hello' },
], config);

 const output = net.run('bonj'); // 'happy'
 console.log(output) ;