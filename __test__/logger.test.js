const supertest = require("supertest");
const app = require("../server");
const fs = require("fs");
const { HTTPErrorCodes } = require("../apis/user/error/userErrors");
const generateRandom = require("../helpers/generaterandonHelpers");
const crypto = require("../helpers/cryptoHelper");
const baseRoute = "api/v1/user";
const logger = require("../config/logger");

describe("LoggerTest", () => {
  test("test should check a user is existing", async () => {
    // const createUser = generateRandomUser();
    // const response = await supertest(app)
    //   .post(`/${baseRoute}/`)
    //   .send(createUser);
    // const validateUserResponse = await supertest(app)
    //   .post(`/${baseRoute}` + `/login`)
    //   .send({ email: createUser.email, password: createUser.password });
   
  });
});

//!*************************************************************************************!
const generateRandomUser = (i) => {
  const inputs = {
    userName: i ? "testing-jest" + i : "testing-jest",
    password: generateRandom.generateRandomString(7),
    mobile: generateRandom.generateRandomNumber(55555, 1000000),
    role: "user",
    email: `${generateRandom.generateRandomString(10)}@gmail.com`,
  };
  return inputs;
};
