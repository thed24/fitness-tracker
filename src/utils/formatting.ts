export const createWeightFormatter =
  (weightUnit: "pounds" | "kilograms") =>
  (word: string, addBrackets: boolean = true): string => {
    const message = `${word} (${weightUnit === "pounds" ? "lbs" : "kg"})`;
    return addBrackets ? message : message.replace("(", "").replace(")", "");
  };

export const createMeasurementFormatter =
  (measurementUnit: "metric" | "imperial") =>
  (word: string, addBrackets: boolean = true): string => {
    const message = `${word} (${measurementUnit === "metric" ? "cm" : "in"})`;
    return addBrackets ? message : message.replace("(", "").replace(")", "");
  };

export const createDistanceFormatter =
  (distanceUnit: "metric" | "imperial") =>
  (word: string, addBrackets: boolean = true): string => {
    const message = `${word} (${distanceUnit === "metric" ? "km" : "mi"})`;
    return addBrackets ? message : message.replace("(", "").replace(")", "");
  };

export const titleCase = (str: string): string => {
  const words = str.split(/(?=[A-Z])/);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
};
