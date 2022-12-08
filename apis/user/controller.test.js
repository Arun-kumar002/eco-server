const userControllers = require("./controller");
const { connectDb } = require("../../config/db");
const { generateRandomString } = require("../../helpers/generaterandonHelpers");

describe("[userController]: create", () => {
  
  const inputs = {
    userName: "testing-jest",
    password: "test123",
    mobile: "8610159926",
    role: "user",
    email: `${generateRandomString(10)}@gmail.com`,
  };

  connectDb();

  test("it should  create a new user", async () => {

    const user = await userControllers.create(inputs);

    await expect(user.email).toBe(inputs.email);
  });

  test("it should return error message for the same mail id", async () => {

    try {

      await userControllers.create(inputs);

    } catch (error) {

      await expect(error.message).toBe("user email id already exist");
    }
  });

  test("it should create a user without role", async () => {

    const withOutrole = {
      userName: "testing",
      mobile: "8610159926",
      email: `${generateRandomString(10)}@gmail.com`,
      password: "arun123",
    };

    const users = await userControllers.create(withOutrole);

    await expect(users.role).toBe("user");
  });

  test("it should create a user without promptPasswordChange", async () => {

    const withOutpromptPasswordChange = {
      userName: "testing",
      mobile: "8610159926",
      role: "user",
      email: `${generateRandomString(10)}@gmail.com`,
    };

    const users = await userControllers.create(withOutpromptPasswordChange);

    await expect(users.promptPasswordChange).toBe(true);
  });
});

describe("[userController] validateuser", () => {

  test("it should return successs if the credentials are correct", async () => {

    const credentials = {
      email: "harish@gmail.com",
      password: "harish123",
    };

    const user = await userControllers.validate(credentials);
 
    expect(user.true).toBe(true);

  });

  test("it should return password missmatch error for entering wrong password", async () => {

    const credentials = {
      email: "harish@gmail.com",
      password: "harish13",
    };

    try {

      await userControllers.validate(credentials);

    } catch (error) {
      expect(error.message).toBe("password mismatch");
    }
  });

  test("it should return user not found for entering wrong email", async () => {

    const credentials = {
      email: "harish1000@gmail.com",
      password: "harish123",
    };

    try {

      await userControllers.validate(credentials);

    } catch (error) {

      expect(error.message).toBe("user not found");
    }
  });
});


