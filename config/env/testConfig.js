const testConfig = {
  // database
  jwt_key: "myS33!!creeeT",
  jwt_expiration: "7 days",
  // dbConnectionString: `mongodb://localhost:27017/manage_event_test`,
  dbConnectionString: "mongodb+srv://hungdb:Hung1234@cluster0.ifdlu.mongodb.net/test?retryWrites=true&w=majority",
  mongoDebug: true,

  // auth
  username: "hungdb",
  password: "123123"
};

export default testConfig;
