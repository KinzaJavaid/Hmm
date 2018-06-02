var HiddenMarkovModel = require('hidden-markov-model');
 
var HMM = HiddenMarkovModel();
 
HMM.setInitialStateVector([0.4, 0.6]); // 1. LCGPA, 2. HCGPA 
 
HMM.setTransitionMatrix([
    // LCGPA, HCGPA
    [0.7, 0.3], // LCGPA 
    [0.6, 0.4]  // HCGPA
]);
 
HMM.setEmissionMatrix([
    // H, Avg, BAvg 
    [0.2, 0.3, 0.5], // LCGPA 
    [0.6, 0.3, 0.1]  // HCGPA 
]);
 
  /* What is the probability that the Hidden Markov Model is able to
   * generate the observed sequence of H Avg H Avg BAvg?
   */
  var alpha = [];
  var result = HMM.forward([0,1,0,1,2], alpha); // H, Avg, H, Avg, BAvg
  console.log(result); 
 
  console.log(alpha);
  /* [ [ 0.3, 0.04000000000000001 ],
     [ 0.09040000000000001, 0.0342 ],
     [ 0.007696000000000001, 0.028584000000000002 ] ] // example output
  */