const chai = require("chai");
let assert = chai.assert;
const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input.", function () {
    expect(convertHandler.getNum("1gal")).to.be.a("number");
    assert.equal(convertHandler.getNum("1kg"), 1);
  });
  test("convertHandler should correctly read a decimal number input.", function () {
    assert.equal(convertHandler.getNum("1.5kg"), 1.5);
    expect(convertHandler.getNum("1.5gal")).to.be.equal(1.5);
  });
  test("convertHandler should correctly read a fractional input.", function () {
    assert.equal(convertHandler.getNum("1/2kg"), 0.5);
    expect(convertHandler.getNum("1/5gal")).to.be.equal(0.2);
  });
  test("convertHandler should correctly read a fractional input with a decimal.", function () {
    assert.equal(convertHandler.getNum("1.8/2kg"), 0.9);
    expect(convertHandler.getNum("1.8/2kg")).to.be.equal(0.9);
  });
  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function () {
    assert.equal(convertHandler.getNum("3/2/3kg"), "invalid number");
    expect(convertHandler.getNum("3/4/5mi")).to.be.equal("invalid number");
  });
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
    const units = ["kg", "lbs", "l", "gal", "mi", "km"];
    for (let unit of units) {
      assert.equal(convertHandler.getNum(unit), 1);
      expect(convertHandler.getNum(unit)).to.be.equal(1);
    }
  });
  test("convertHandler should correctly read each valid input unit.", function () {
    const testCases = [
      { input: "1kg", expected: "kg" },
      { input: "1lbs", expected: "lbs" },
      { input: "1l", expected: "L" },
      { input: "1gal", expected: "gal" },
      { input: "1mi", expected: "mi" },
      { input: "1km", expected: "km" },
    ];
    testCases.forEach(function (testCase) {
      assert.equal(convertHandler.getUnit(testCase.input), testCase.expected);
      expect(convertHandler.getUnit(testCase.input)).to.be.equal(testCase.expected);
    });
  });
  test("convertHandler should correctly return an error for an invalid input unit.", function () {
    const invalidUnits = ["1k", "1g", "1m", "ll", "LL", "mil", "kig", "gall"];
    for (let unit of invalidUnits) {
      assert.equal(convertHandler.getUnit(unit), "invalid unit");
      expect(convertHandler.getUnit(unit)).to.be.equal("invalid unit");
    }
  });
  test("convertHandler should return the correct return unit for each valid input unit.", function () {
    const testCases = [
      { input: "kg", expected: "lbs" },
      { input: "lbs", expected: "kg" },
      { input: "l", expected: "gal" },
      { input: "gal", expected: "L" },
      { input: "mi", expected: "km" },
      { input: "km", expected: "mi" },
    ];
    testCases.forEach(function (testCase) {
      assert.equal(convertHandler.getReturnUnit(testCase.input), testCase.expected);
      expect(convertHandler.getReturnUnit(testCase.input)).to.be.equal(testCase.expected);
    });
  });
  test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function () {
    const testCases = [
      { input: "kg", expected: "kilograms" },
      { input: "lbs", expected: "pounds" },
      { input: "l", expected: "liters" },
      { input: "gal", expected: "gallons" },
      { input: "mi", expected: "miles" },
      { input: "km", expected: "kilometers" },
    ];
    testCases.forEach(function (testCase) {
      assert.equal(convertHandler.spellOutUnit(testCase.input), testCase.expected);
      expect(convertHandler.spellOutUnit(testCase.input)).to.be.equal(testCase.expected);
    });
  });
  test("convertHandler should correctly convert gal to L.", function () {
    assert.equal(convertHandler.convert(1, "gal"), 3.78541);
    expect(convertHandler.convert(1, "gal")).to.be.equal(3.78541);
  });
  test("convertHandler should correctly convert L to gal.", function () {
    assert.equal(convertHandler.convert(1, "L"), 0.26417);
    expect(convertHandler.convert(1, "L")).to.be.equal(0.26417);
  });
  test("convertHandler should correctly convert mi to km.", function () {
    assert.equal(convertHandler.convert(1, "mi"), 1.60934);
    expect(convertHandler.convert(1, "mi")).to.be.equal(1.60934);
  });
  test("convertHandler should correctly convert km to mi.", function () {
    assert.equal(convertHandler.convert(1, "km"), 0.62137);
    expect(convertHandler.convert(1, "km")).to.be.equal(0.62137);
  });
  test("convertHandler should correctly convert lbs to kg.", function () {
    assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
    expect(convertHandler.convert(1, "lbs")).to.be.equal(0.45359);
  });
  test("convertHandler should correctly convert kg to lbs.", function () {
    assert.equal(convertHandler.convert(1, "kg"), 2.20462);
    expect(convertHandler.convert(1, "kg")).to.be.equal(2.20462);
  });
});
