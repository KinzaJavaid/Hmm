(function(root) {
    'use strict';
  
    function HiddenMarkovModel() {
      if (!(this instanceof HiddenMarkovModel)) {
        return new HiddenMarkovModel();
      }
  
      this.initialStateVector = [];
      this.transitionStateMatrix = [];
      this.emissionStateMatrix = [];
      this.iterationsCount = 0;
    }
  
    HiddenMarkovModel.prototype.setInitialStateVector = function(vector) {
      this.initialStateVector = vector;
      // this.currentStateVector = vector;
    };
  
    HiddenMarkovModel.prototype.getInitialStateVector = function() {
      return this.initialStateVector;
    };
  
    HiddenMarkovModel.prototype.setTransitionMatrix = function(matrix) {
      this.transitionStateMatrix = matrix;
    };
  
    HiddenMarkovModel.prototype.getTransitionMatrix = function() {
      return this.transitionStateMatrix;
    };
  
    HiddenMarkovModel.prototype.setEmissionMatrix = function(matrix) {
      this.emissionStateMatrix = matrix;
    };
  
    HiddenMarkovModel.prototype.getEmissionMatrix = function() {
      return this.emissionStateMatrix;
    };
  
    HiddenMarkovModel.prototype.forward = function(observedSequence, alpha) {
      alpha =  alpha || [];
      var PI = this.initialStateVector;
      var A = this.transitionStateMatrix;
      var B = this.emissionStateMatrix;
      var O = observedSequence || [];
      var T = O.length; //2
      var N = A.length; //
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
          for (var l = 0; l < N; l++) {
            result += alpha[i-1][l] * A[l][j] * B[j][O[i]];
          }
          alpha[i][j] = result;
        }
      }
  
      // Termination
      for (var i = 0; i < N; i++) {
        probability += alpha[T-1][i];
      }
  
      return probability;
    };
  
    if (typeof exports !== 'undefined') {
      if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = HiddenMarkovModel;
      }
      exports.HiddenMarkovModel = HiddenMarkovModel;
    } else if (typeof define === 'function' && define.amd) {
      define([], function() {
        return HiddenMarkovModel;
      });
    } else {
      root.HiddenMarkovModel = HiddenMarkovModel;
    }
  
  })(this);