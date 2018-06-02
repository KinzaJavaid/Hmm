var HiddenMarkovModel = require('hidden-markov-model');
 
var HMM = HiddenMarkovModel();
 
HMM.setInitialStateVector([0.99, 0.01]); // 1. Healthy, 2. Fever 
 
HMM.setTransitionMatrix([
    // A, B 
    [0.99, 0.01], //A
    [0.01, 0.99]  //B 
]);
 
HMM.setEmissionMatrix([
    // 0, 1 
    [0.8, 0.2], // A 
    [0.1, 0.9]  // B 
]);
 
  /* What is the probability that the Hidden Markov Model is able to
   * generate the observed sequence of being Normal on day 1,
   * Cold on day2, and Dizzy on day 3?
   */
  var alpha = [];
  var result = HMM.forward([0, 1, 0], alpha); // Normal, Cold, Dizzy 
  console.log(result); // 0.03628 
 
  console.log(alpha);
  /* [ [ 0.3, 0.04000000000000001 ],
     [ 0.09040000000000001, 0.0342 ],
     [ 0.007696000000000001, 0.028584000000000002 ] ]
  */