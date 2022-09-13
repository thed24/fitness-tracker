export const createWeightFormatter =
  (weightUnit: "pounds" | "kilograms") =>
  (word: string, addBrackets: boolean = true) => {
    const message = `${word} (${weightUnit === "pounds" ? "lbs" : "kg"})`;
    return addBrackets ? message : message.replace("(", "").replace(")", "");
  };

export const createMeasurementFormatter =
  (measurementUnit: "metric" | "imperial") =>
  (word: string, addBrackets: boolean = true) => {
    const message = `${word} (${measurementUnit === "metric" ? "cm" : "in"})`;
    return addBrackets ? message : message.replace("(", "").replace(")", "");
  };

export const createDistanceFormatter =
  (distanceUnit: "metric" | "imperial") =>
  (word: string, addBrackets: boolean = true) => {
    const message = `${word} (${distanceUnit === "metric" ? "km" : "mi"})`;
    return addBrackets ? message : message.replace("(", "").replace(")", "");
  };
