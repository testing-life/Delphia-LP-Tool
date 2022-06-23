import React from "react";
import { trim } from "./strings";

describe("strings trim", () => {
  it("should return trimmed value", () => {
    const input = "435346.975544";
    const expectedResult = "435346.97";
    const result = trim(input);
    expect(result).toEqual(expectedResult);
  });

  it("should return empty string if no value", () => {
    const input = "";
    const expectedResult = "";
    const result = trim(input);
    expect(result).toEqual(expectedResult);
  });

  it("should return empty string if wrong value", () => {
    const input = 9897.334;
    const expectedResult = "";
    const result = trim(input);
    expect(result).toEqual(expectedResult);
  });

  it("should return empty string if value is not numeric", () => {
    const input = "43abc5346.9755fgh44";
    const expectedResult = "";
    const result = trim(input);
    expect(result).toEqual(expectedResult);
  });

  it("should return initial value if integer", () => {
    const input = "435346";
    const expectedResult = "435346";
    const result = trim(input);
    expect(result).toEqual(expectedResult);
  });

  it("should trim last separator", () => {
    const input = "435346.";
    const expectedResult = "435346";
    const result = trim(input);
    expect(result).toEqual(expectedResult);
  });

  it("should return initial value string if wrong separator", () => {
    const input = "435346-43223";
    const expectedResult = "";
    const result = trim(input);
    expect(result).toEqual(expectedResult);
  });
});
