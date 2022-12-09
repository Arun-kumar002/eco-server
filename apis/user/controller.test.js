const userControllers = require("./controller");
const { connectDb } = require("../../config/db");
const {
  generateRandomString,
  generateRandomNumber,
} = require("../../helpers/generaterandonHelpers");

describe("[userController]:", () => {
  const inputs = {
    userName: "testing-jest",
    password: "test123",
    mobile: "8610159926",
    role: "user",
    email: `${generateRandomString(10)}@gmail.com`,
  };

  connectDb();

  describe("create", () => {
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

  describe(" validate", () => {
    test("it should return successs if the credentials are correct", async () => {
      const credentials = {
        email: "harish@gmail.com",
        password: "harish123",
      };

      const user = await userControllers.validate(credentials);

      expect(user.token).toBe(user.token);
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
        email: `${generateRandomString(15)}@gmail.com`,
        password: "harish123",
      };

      try {
        await userControllers.validate(credentials);
      } catch (error) {
        expect(error.message).toBe("user not found");
      }
    });
  });

  describe("getAllUsers", () => {
    const getAllUersInputs = {
      skip: 0,
      limit: generateRandomNumber(1, 10),
      getCount: false,
      name: "(pavan)",
      email: `${generateRandomString(15)}@gmail.com`,
    };

    test("it should get all the users from the users collection", async () => {
      let users = await userControllers.getAll({
        skip: getAllUersInputs.skip,
        limit: getAllUersInputs.limit,
        getCount: getAllUersInputs.getCount,
      });

      expect(users.users).toBe(users.users);
    });

    test("it should return a empty [] for users not found", async () => {
      let users = await userControllers.getAll({
        skip: getAllUersInputs.skip,
        limit: getAllUersInputs.limit,
        getCount: getAllUersInputs.getCount,
        email: getAllUersInputs.email,
      });

      expect(typeof users.users).toBe("object");
    });

    test("it should return a count if we give getCount equal to true", async () => {
      let users = await userControllers.getAll({
        skip: getAllUersInputs.skip,
        limit: getAllUersInputs.limit,
        getCount: true,
      });

      expect(users.count).toBe(users.count);
    });

    test("it should return a count is undefined if we give getCount equal to false", async () => {
      let users = await userControllers.getAll({
        skip: getAllUersInputs.skip,
        limit: getAllUersInputs.limit,
        getCount: false,
      });

      expect(users.count).toBe(undefined);
    });
  });

  describe("update", () => {
    test("it should return user not found for invalid user", async () => {
      try {
        const user = await userControllers.getUserByEmailId(
          "invalid@gmail.com"
        );
        const id = user._id;

        const updated = await userControllers.updateById(id);
        expect(updated.modifiedCount).toBe(1);
      } catch (error) {
        expect(error.message).toBe("user not found");
      }
    });

    test("it should update the existing user with correct credentials", async () => {
      const user = await userControllers.getUserByEmailId(inputs.email);

      const id = user._id;

      const updated = await userControllers.updateById({
        id,
        ...inputs,
        password: "123456",
      });

      expect(updated.modifiedCount).toBe(1);
    });
  });

  describe("getUserByEmailId", () => {
    test("it should throw a error for wrong credentials", async () => {
      try {
        const credentials = {
          email: `${generateRandomString(15)}@gmail.com`,
        };
        await userControllers.getUserByEmailId(credentials.email);
      } catch (error) {
        expect(error.errorCode).toBe(400);
      }
    });

    test("it should throw a error for wrong credentials", async () => {
      let user = await userControllers.getUserByEmailId(inputs.email);

      expect(user.user).toBe(user.user);
    });
  });

  describe("delete", () => {
    test("it should delete a existing user", async () => {
      const user = await userControllers.getUserByEmailId(inputs.email);
      const id = user._id;

      const deleteUser = await userControllers.deleteById(id);

      expect(deleteUser.email).toBe(inputs.email);
    });

    test("it should return not found for invalid user", async () => {
      try {
        const user = await userControllers.getUserByEmailId(
          "invalid@gmail.com"
        );
        const id = user._id;

        const deleteUser = await userControllers.deleteById(id);

        expect(deleteUser.email).toBe(inputs.email);
      } catch (error) {
        expect(error.message).toBe("user not found");
      }
    });
  });



  describe("getById", () => {
    test("it should return a user by getting id as a input", async () => {
      let id = "6390d5639d2c38147ec75d97";

      let user = await userControllers.getById(id);

      expect(user.id).toBe(id);
    });

    test("it should return a user by getting id as a input", async () => {
      try {
        let id = generateRandomString(24);
        await userControllers.getById(id);

      } catch (error) {
        expect(error).toBe(error);

      }
    });
  });

  
});
