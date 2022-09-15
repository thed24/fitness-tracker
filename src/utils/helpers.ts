/* eslint-disable no-console */
export type LogScope = "info" | "error" | "debug";

export const log = (message: any, scope: LogScope = "debug") => {
  if (process.env.NODE_ENV !== "production") {
    const messageAsJson = JSON.stringify(message);
    switch (scope) {
      case "info":
        console.info(messageAsJson);
        break;
      case "error":
        console.error(messageAsJson);
        break;
      case "debug":
        console.debug(messageAsJson);
        break;
      default:
        console.log(messageAsJson);
    }
  }
};
