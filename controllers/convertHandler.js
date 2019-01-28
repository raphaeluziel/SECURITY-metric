/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    var start = input.search(/\d/); // Beginning of digit
    var end = input.search(/[A-Za-z]/); // Beginning of unit
    var divider = input.search(/\//); // Fraction?
    var space = input.search(/\d\s+\d/); // Space?
    var whole; // Whole part of mixed number
    var rest; // Original string without whole number part

    // If number is mixed, extract the "whole" part from the fraction
    if (space > 0){
      whole = input.substring(start, space + 1);
      input = input.substring(space + 1);
      start = start = input.search(/\d/);
      divider = input.search(/\//);
      end = input.search(/[A-Za-z]/);
      result = Number(whole);
    }

    // If number is a fraction extract numerator and denominator and divide
    if(divider > 0){
      var numerator = input.substring(start, divider);
      var denominator = input.substring(divider + 1, end);
      result += numerator / denominator;
    } 
    // Otherwise number is everything before unit
    else{
      result = Number(input.substring(start, end));
    }

    // Round result to five decimal places
    result *= 100000;
    result = Math.round(result) / 100000;

    return result;
    return input.substring(start, end);
  };
  
  this.getUnit = function(input) { 
    var end = input.search(/[A-Za-z]/);
    return input.substring(end);
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    switch(initUnit){
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result ='gal';
        break;
      case 'lbs':
        result ='kg';
        break;
      case 'kg':
        result ='lbs';
        break;
      case 'mi':
        result ='km';
        break;
      case 'km':
        result = 'mi';
        break;       
      default:
        result = 'invalid unit';
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    
    unit === 'gal' ? result = 'gallons'
    : unit === 'L' ? result = 'liters'
    : unit === 'lbs' ? result = 'pounds'
    : unit === 'kg' ? result = 'kilograms'
    : unit === 'mi' ? result = 'miles'
    : unit === 'km' ? result = 'kilometers'
    : result = 'invalid unit';
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    var result = initNum;

    initUnit === 'gal' ? result *= galToL
    : initUnit === 'L' ? result /= galToL
    : initUnit === 'lbs' ? result *= lbsToKg
    : initUnit === 'Kg' ? result /= lbsToKg
    : initUnit === 'mi' ? result *= miToKm
    : initUnit === 'km' ? result /= miToKm
    : result = 'invalid unit';
    
    result *= 100000;
    result = Math.round(result) / 100000;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
