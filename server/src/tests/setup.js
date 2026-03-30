const waitPort = require("wait-port");

beforeAll(async () => {
  await waitPort({ host: "db", port: 3306, timeout: 10000 });
});
