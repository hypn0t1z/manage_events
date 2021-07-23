let env = process.env.NODE_ENV || "development";
if (env === "test") env = "testConfig";
const appConfig = require(`./${env}`).default;

export default appConfig;
