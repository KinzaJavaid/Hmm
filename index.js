var HiddenMarkovModel = require('hidden-markov-model');
 
var HMM = HiddenMarkovModel();
 
HMM.setInitialStateVector([0.8, 0.2]); // 1. hot, 2. cold 
 
HMM.setTransitionMatrix([
    // Hot, Cold
    [0.7, 0.3], // hot 
    [0.4, 0.6]  // cold 
]);
 
HMM.setEmissionMatrix([
    // 1 ice-cream, 2 ice-cream, 3 ice-cream 
    [0.2, 0.4, 0.4], // hot 
    [0.5, 0.4, 0.1]  // cold 
]);
 
  /* What is the probability that the Hidden Markov Model is able to
   * generate the observed sequence of 3 1 3?
   */
  var alpha = [];
  var result = HMM.forward([2, 0, 2], alpha); // 3, 1, 3 
  console.log(result); // 0.03628 
 
  console.log(alpha);
  /* [ [ 0.3, 0.04000000000000001 ],
     [ 0.09040000000000001, 0.0342 ],
     [ 0.007696000000000001, 0.028584000000000002 ] ]
  */