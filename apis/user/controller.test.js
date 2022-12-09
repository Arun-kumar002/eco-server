const userControllers = require("./controller");
const { connectDb } = require("../../config/db");
const generateRandom = require("../../helpers/generaterandonHelpers");
const userErrors = require("./error/userErrors");

const UserErrorCodes = userErrors.UserErrorCodes;

beforeAll(() => {
  connectDb();
});

describe("create", () => {
  test("it should  create a new user", async () => {
    const createUser = generateRandomUser();
    const user = await userControllers.create(createUser);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.userName).toBe(createUser.userName);
    expect(user.email).toBe(createUser.email);
    expect(user.mobile).toBe(createUser.mobile);
    expect(user.password).toBe(createUser.password);
    expect(user.role).toBe(createUser.role);
    expect(user.promptPasswordChange).toBe(true);
  });

  test("it should return error message for the same mail id", async () => {
    try {
      const createUser = generateRandomUser();

      await userControllers.create(createUser);
      await userControllers.create(createUser);
    } catch (error) {
      expect(error.errorCode).toBe(UserErrorCodes.ENTITY_ALREADY_EXISTS);
    }
  });

  test("it should create a user without role", async () => {
    const user = {
      userName: "testing",
      mobile: generateRandom.generateRandomNumber(55555, 1000000),
      email: `${generateRandom.generateRandomString(10)}@gmail.com`,
      password: "arun123",
    };
    const resultUser = await userControllers.create(user);

    expect(resultUser).toBeDefined();
    expect(resultUser.id).toBeDefined();
    expect(resultUser.updatedAt).toBeDefined();
    expect(resultUser.createdAt).toBeDefined();
    expect(resultUser.userName).toBe(user.userName);
    expect(resultUser.email).toBe(user.email);
    expect(resultUser.role).toBeDefined();
    expect(resultUser.mobile).toBe(user.mobile);
    expect(resultUser.password).toBe(user.password);
    expect(resultUser.promptPasswordChange).toBe(true);
  });

  test("it should create a user without promptPasswordChange", async () => {
    const user = {
      userName: "jest-testing",
      mobile: generateRandom.generateRandomNumber(55555, 1000000),
      role: "user",
      email: `${generateRandom.generateRandomString(10)}@gmail.com`,
    };

    const resultUser = await userControllers.create(user);

    expect(resultUser).toBeDefined();
    expect(resultUser.id).toBeDefined();
    expect(resultUser.updatedAt).toBeDefined();
    expect(resultUser.createdAt).toBeDefined();
    expect(resultUser.userName).toBe(user.userName);
    expect(resultUser.email).toBe(user.email);
    expect(resultUser.role).toBe(user.role);
    expect(resultUser.mobile).toBe(user.mobile);
    expect(resultUser.password).toBe(user.password);
    expect(resultUser.promptPasswordChange).toBe(true);
  });

  test("it should return error because email is mandatory field", async () => {
    try {
      let createUser = generateRandomUser();
      createUser.email = null;
      await userControllers.create(createUser);
    } catch (error) {
      expect(error.errorCode).toBe(UserErrorCodes.MANDATORY_FIELDS_ERROR);
    }
  });

  test("it should return error because userName is manidatory field", async () => {
    try {
      let createUser = generateRandomUser();
      createUser.userName = null;
      await userControllers.create(createUser);
    } catch (error) {
      expect(error.errorCode).toBe(UserErrorCodes.MANDATORY_FIELDS_ERROR);
    }
  });
});

describe("update", () => {
  test("it should return user not found for invalid user", async () => {
    try {
      const user = await userControllers.getUserByEmailId("invalid@gmail.com");
      const id = user.id;

      const updatedUser = await userControllers.updateById(id);

      expect(updatedUser).toBeDefined();
      expect(updatedUser).toBeDefined();
      expect(updatedUser.id).toBeDefined();
      expect(updatedUser.updatedAt).toBeDefined();
      expect(updatedUser.createdAt).toBeDefined();
      expect(updatedUser.userName).toBe(inputs.userName);
      expect(updatedUser.email).toBe(inputs.email);
      expect(updatedUser.role).toBe(inputs.role);
      expect(updatedUser.mobile).toBe(inputs.mobile);
      expect(updatedUser.promptPasswordChange).toBe(true);
    } catch (error) {
      expect(error.errorCode).toBe(UserErrorCodes.ENTITY_NOT_FOUND);
    }
  });

  test("it should update the existing user with correct credentials", async () => {
    const createUser = generateRandomUser();
    const create = await userControllers.create(createUser);
    expect(create).toBeDefined();

    const user = await userControllers.getUserByEmailId(createUser.email);

    const id = user.id;

    const updatedUser = await userControllers.updateById({
      id,
      ...createUser,
      password: generateRandom.generateRandomString(6),
    });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBeDefined();
    expect(updatedUser.updatedAt).toBeDefined();
    expect(updatedUser.createdAt).toBeDefined();
    expect(updatedUser.userName).toBe(createUser.userName);
    expect(updatedUser.email).toBe(createUser.email);
    expect(updatedUser.role).toBe(createUser.role);
    expect(updatedUser.mobile).toBe(createUser.mobile);
    expect(updatedUser.promptPasswordChange).toBe(true);
  });
});

describe("delete", () => {
  test("it should delete a existing user", async () => {
    const createUser = generateRandomUser();
    const create = await userControllers.create(createUser);
    expect(create).toBeDefined();

    const id = create.id;
    const deletedUser = await userControllers.deleteById(id);

    expect(deletedUser).toBeDefined();
  });

  test("it should return not found for invalid user", async () => {
    try {
      const user = await userControllers.getUserByEmailId(
        `${generateRandom.generateRandomString()}@gmail.com`
      );
      await expect(user).toBeDefined();

      const id = user._id;

      const deleteUser = await userControllers.deleteById(id);
      await expect(deleteUser).toBeDefined();

      expect(deleteUser.email).toBe(inputs.email);
    } catch (error) {
      expect(error.errorCode).toBe(UserErrorCodes.CREDENTIAL_MISSMATCH);
    }
  });
});

describe("validate", () => {
  test("it should return successs if the credentials are correct", async () => {
    const createUser = generateRandomUser();
    const user = await userControllers.create(createUser);
    expect(user).toBeDefined();

    const credentials = {
      email: createUser.email,
      password: createUser.password,
    };

    const validate = await userControllers.validate(credentials);

    expect(validate).toBeDefined();
    expect(validate.token).toBeDefined();
  });

  test("it should return password missmatch error for entering wrong password", async () => {
    const createUser = generateRandomUser();
    const user = await userControllers.create(createUser);
    expect(user).toBeDefined();

    const credentials = {
      email: user.email,
      password: "harish13",
    };

    try {
      await userControllers.validate(credentials);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.errorCode).toBe(UserErrorCodes.CREDENTIAL_MISSMATCH);
    }
  });

  test("it should return user not found for entering wrong email", async () => {
    const credentials = {
      email: `${generateRandom.generateRandomString(15)}@gmail.com`,
      password: "harish123",
    };

    try {
      await userControllers.validate(credentials);
    } catch (error) {
      expect(error).toBeDefined();

      expect(error.errorCode).toBe(UserErrorCodes.CREDENTIAL_MISSMATCH);
    }
  });

  test("it should return error because email is mandatory field", async () => {
    try {
      await userControllers.validate({
        password: "123455",
      });
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.errorCode).toBe(UserErrorCodes.MANDATORY_FIELDS_ERROR);
    }
  });
});

describe("getAll", () => {
  const params = {
    skip: 0,
    limit: generateRandom.generateRandomNumber(1, 10),
    getCount: false,
    name: "(pavan)",
    email: `${generateRandom.generateRandomString(15)}@gmail.com`,
  };

  test("it should get all the users from the users collection", async () => {
    let result = await userControllers.getAll({
      skip: params.skip,
      limit: params.limit,
      getCount: params.getCount,
    });

    expect(result).toBeDefined();
    expect(result.users).toBeDefined();
    expect(result.users[0].id).toBeDefined();
    expect(result.users[0].updatedAt).toBeDefined();
    expect(result.users[0].createdAt).toBeDefined();
    expect(result.users[0].userName).toBeDefined();
    expect(result.users[0].email).toBeDefined();
    expect(result.users[0].role).toBeDefined();
    expect(result.users[0].mobile).toBeDefined();
    expect(result.users[0].promptPasswordChange).toBeDefined();
  });

  test("it should return a empty [] for users not found", async () => {
    let users = await userControllers.getAll({
      skip: params.skip,
      limit: params.limit,
      getCount: params.getCount,
      email: params.email,
    });

    await expect(users).toBeDefined();

    expect(typeof users.users).toBe("object");
  });

  test("it should return a count if we give getCount equal to true", async () => {
    let result = await userControllers.getAll({
      skip: params.skip,
      limit: params.limit,
      getCount: true,
    });

    expect(result).toBeDefined();
    expect(result.count).toBeDefined();
    expect(result.users).toBeDefined();
    expect(result.users[0].id).toBeDefined();
    expect(result.users[0].updatedAt).toBeDefined();
    expect(result.users[0].createdAt).toBeDefined();
    expect(result.users[0].userName).toBeDefined();
    expect(result.users[0].email).toBeDefined();
    expect(result.users[0].role).toBeDefined();
    expect(result.users[0].mobile).toBeDefined();
    expect(result.users[0].promptPasswordChange).toBeDefined();
  });

  test("it should return a count is undefined if we give getCount equal to false", async () => {
    let users = await userControllers.getAll({
      skip: params.skip,
      limit: params.limit,
      getCount: false,
    });
    await expect(users).toBeDefined();

    expect(users.count).toBe(undefined);
  });
});

describe("getUserByEmailId", () => {
  test("it should throw a error for wrong credentials", async () => {
    try {
      const credentials = {
        email: `${generateRandom.generateRandomString(15)}@gmail.com`,
      };

      await userControllers.getUserByEmailId(credentials.email);
    } catch (error) {
      expect(error).toBeDefined();

      expect(error.errorCode).toBe(UserErrorCodes.CREDENTIAL_MISSMATCH);
    }
  });

  test("it should return a user for correct email", async () => {
    const createUser = generateRandomUser();
    const create = await userControllers.create(createUser);
    expect(create).toBeDefined();

    let user = await userControllers.getUserByEmailId(createUser.email);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.userName).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.role).toBeDefined();
    expect(user.mobile).toBeDefined();
    expect(user.promptPasswordChange).toBeDefined();
  });

  test("it should return error because email is mandatory field", async () => {
    try {
      await userControllers.getUserByEmailId();
    } catch (error) {
      expect(error.errorCode).toBe(UserErrorCodes.CREDENTIAL_MISSMATCH);
    }
  });
});

describe("getById", () => {
  test("it should return a user by getting id as a input", async () => {
    const createUser = generateRandomUser();
    const create = await userControllers.create(createUser);
    expect(create).toBeDefined();

    let user = await userControllers.getById(create.id);

    expect(user).toBeDefined();
    expect(user.id).toBe(create.id);
    expect(user.updatedAt).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.userName).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.role).toBeDefined();
    expect(user.mobile).toBeDefined();
    expect(user.promptPasswordChange).toBeDefined();
  });

  test("it should return a user by getting id as a input", async () => {
    try {
      let id = generateRandom.generateRandomString(24);
      await userControllers.getById(id);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

const generateRandomUser = () => {
  const inputs = {
    userName: "testing-jest",
    password: "test123",
    mobile: generateRandom.generateRandomNumber(55555, 1000000),
    role: "user",
    email: `${generateRandom.generateRandomString(10)}@gmail.com`,
  };
  return inputs;
};
