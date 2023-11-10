function ConvertHandler() {
  this.getNum = function (input) {
    const match = input.match(/^([\d.]+)?\s*\/?\s*([\d.]+)?([a-zA-Z]+)$/);
    if (!match) {
      return "invalid number";
    }
    const numerator = match[1] ? +match[1] : 1;
    const denominator = match[2] ? +match[2] : 1;
    if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
      return "invalid number";
    }
    return numerator / denominator;
  };

  this.getUnit = function (input) {
    const validUnits = ["gal", "km", "lbs", "kg", "l", "mi"];
    const toLower = input.toLowerCase();
    const match = toLower.match(/[A-Za-z]+/);
    if (match) {
      const unit = match[0];
      if (!validUnits.includes(unit)) {
        return "invalid unit";
      }
      return unit === "l" ? "L" : unit;
    }
    return "invalid unit";
  };

  this.getReturnUnit = function (initUnit) {
    const units = {
      gal: "L",
      l: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };

    const lowerCaseInitUnit = initUnit.toLowerCase();

    if (units.hasOwnProperty(lowerCaseInitUnit)) {
      return units[lowerCaseInitUnit];
    } else {
      return null;
    }
  };

  this.spellOutUnit = function (unit) {
    const units = {
      l: "liters",
      gal: "gallons",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers",
    };

    const lowerCaseUnit = unit.toLowerCase();

    if (units.hasOwnProperty(lowerCaseUnit)) {
      return units[lowerCaseUnit];
    } else {
      return null;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const lowerCaseInitUnit = initUnit.toLowerCase();

    const conversions = {
      mi: initNum * miToKm,
      km: initNum / miToKm,
      lbs: initNum * lbsToKg,
      kg: initNum / lbsToKg,
      gal: initNum * galToL,
      l: initNum / galToL,
    };

    if (conversions.hasOwnProperty(lowerCaseInitUnit)) {
      return +conversions[lowerCaseInitUnit].toFixed(5);
    } else {
      return null;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(
      returnUnit
    )}`;
  };
}

module.exports = ConvertHandler;
