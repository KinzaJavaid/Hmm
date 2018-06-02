 (function(root) {
     'use strict';
  
     function ViterbiAlgorithm() {
       if (!(this instanceof ViterbiAlgorithm)) {
         return new ViterbiAlgorithm();
       }
  
       this.initialStateVector = [];
      // this.currentStateVector = [];
       this.transitionStateMatrix = [];
       this.emissionStateMatrix = [];
       this.iterationsCount = 0;
     }
  
     ViterbiAlgorithm.prototype.setInitialStateVector = function(vector) {
       this.initialStateVector = vector;
       // this.currentStateVector = vector;
     };
  
     ViterbiAlgorithm.prototype.getInitialStateVector = function() {
       return this.initialStateVector;
     };
  
     ViterbiAlgorithm.prototype.setTransitionMatrix = function(matrix) {
       this.transitionStateMatrix = matrix;
     };
  
     ViterbiAlgorithm.prototype.getTransitionMatrix = function() {
       return this.transitionStateMatrix;
     };
  
     ViterbiAlgorithm.prototype.setEmissionMatrix = function(matrix) {
       this.emissionStateMatrix = matrix;
     };
  
     ViterbiAlgorithm.prototype.getEmissionMatrix = function() {
       return this.emissionStateMatrix;
     };
  
     ViterbiAlgorithm.prototype.forward = function(observedSequence, alpha) {
       alpha =  alpha || [];
       var PI = this.initialStateVector;
       var A = this.transitionStateMatrix;
       var B = this.emissionStateMatrix;
       var O = observedSequence || [];
       var T = O.length; //3
       var N = A.length;
       var probability = 0;
  
       if (!Array.isArray(O)) {
         throw new TypeError('Emssion sequence must be an array');
       }
  
       if (!Array.isArray(alpha)) {
         throw new TypeError('Alpha must be an array');
       }
  
       if (!O.length) {
         return probability;
       }

  
       // Initialization
       for (var i = 0; i < N; i++) {
         alpha[i] = [];
         
          alpha[0][i] = PI[i] * B[i] [O[0]];
       }  
       // Recursion
       for (var i = 1; i < T; i++) {
         alpha[i] = [];
         for (var j = 0; j < N; j++) {
           var result = 0;
           var currentResult = 0;
           for (var l = 0; l < N; l++) {
             console.log(result);
             result = alpha[i-1][l] * A[l][j] * B[j][O[i]];
             if(result > currentResult) {
                 currentResult = result;
             }
           }
           alpha[i][j] = currentResult;
         }
       }
  
       // Termination
       for (var i = 0; i < N; i++) {
         probability += alpha[T-1][i];
       }
  
       return probability;
     };
  
     if (typeof exports !== 'undefined') {
       if (typeof module !== 'undefined' && module.exports) {
         exports = module.exports = ViterbiAlgorithm;
       }
       exports.ViterbiAlgorithm = ViterbiAlgorithm;
     } else if (typeof define === 'function' && define.amd) {
       define([], function() {
         return ViterbiAlgorithm;
       });
     } else {
       root.ViterbiAlgorithm = ViterbiAlgorithm;
     }
  
   })(this);