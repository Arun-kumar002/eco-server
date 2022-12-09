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
    skip: 1,
    limit: 5,
    getCount: true,
    name: "(pavan)",
  };

  test("it should return the count as 5 because we set limit as 5", async () => {
    const user1 = generateRandomUser();
    const createUser1 = await userControllers.create(user1);
    expect(createUser1).toBeDefined();
    const user2 = generateRandomUser();
    const createUser2 = await userControllers.create(user2);
    expect(createUser2).toBeDefined();
    const user3 = generateRandomUser();
    const createUser3 = await userControllers.create(user3);
    expect(createUser3).toBeDefined();
    const user4 = generateRandomUser();
    const createUser4 = await userControllers.create(user4);
    expect(createUser4).toBeDefined();
    const user5 = generateRandomUser();
    const createUser5 = await userControllers.create(user5);
    expect(createUser5).toBeDefined();

    const params = {
      skip: 1,
      limit: 5,
      getCount: true,
    };
    let result = await userControllers.getAll({
      skip: params.skip,
      limit: params.limit,
      getCount: params.getCount,
    });

    expect(result).toBeDefined();
    expect(result.users.length).toBe(5);
  });

  test("it should check the users are skipped", async () => {
    const user1 = generateRandomUser();
    const createUser1 = await userControllers.create(user1);
    expect(createUser1).toBeDefined();
    const user2 = generateRandomUser();
    const createUser2 = await userControllers.create(user2);
    expect(createUser2).toBeDefined();
    const user3 = generateRandomUser();
    const createUser3 = await userControllers.create(user3);
    expect(createUser3).toBeDefined();
    const user4 = generateRandomUser();
    const createUser4 = await userControllers.create(user4);
    expect(createUser4).toBeDefined();
    const user5 = generateRandomUser();
    const createUser5 = await userControllers.create(user5);
    expect(createUser5).toBeDefined();
    const user6 = generateRandomUser();
    const createUser6 = await userControllers.create(user6);
    expect(createUser6).toBeDefined();
    const user7 = generateRandomUser();
    const createUser7 = await userControllers.create(user7);
    expect(createUser7).toBeDefined();
    const user8 = generateRandomUser();
    const createUser8 = await userControllers.create(user8);
    expect(createUser8).toBeDefined();
    const user9 = generateRandomUser();
    const createUser9 = await userControllers.create(user9);
    expect(createUser9).toBeDefined();
    const user10 = generateRandomUser();
    const createUser10 = await userControllers.create(user10);
    expect(createUser10).toBeDefined();

    let resultWithoutSkipAndLimit = await userControllers.getAll({
      skip: 0,
      limit: 0,
      getCount: true,
    });
    expect(resultWithoutSkipAndLimit).toBeDefined();
    expect(resultWithoutSkipAndLimit.count).toBe(
      resultWithoutSkipAndLimit.users.length
    );

    let resultWithSkipAndLimit = await userControllers.getAll({
      skip: 5,
      limit: 0,
      getCount: true,
    });

    expect(resultWithSkipAndLimit).toBeDefined();
    expect(resultWithSkipAndLimit.users.length).toBe(
      resultWithoutSkipAndLimit.users.length - 5
    );
  });

  test("it should get all the users from the users collection", async () => {
    let result = await userControllers.getAll({
      skip: 0,
      limit: 0,
      getCount: params.getCount,
    });
    expect(result).toBeDefined();
    expect(result.users).toBeDefined();
  
    // expect(result.users).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({
    //       '_id':toBeDefined(),
    //       "_v":toBeDefined(),
    //       "createdAt": toBeDefined(),
    //       "updatedAt": toBeDefined(),
    //       "email": toBeDefined(),
    //       "userName": toBeDefined(),
    //       "role": toBeDefined(),
    //       "promptPasswordChange": toBeDefined(),
    //       "mobile": toBeDefined(),
    //     }),
    //   ])
    // );

    // expect(id).toBeDefined();
    // expect(updatedAt).toBeDefined();
    // expect(createdAt).toBeDefined();
    // expect(userName).toBeDefined();
    // expect(email).toBeDefined();
    // expect(role).toBeDefined();
    // expect(mobile).toBeDefined();
    // expect(promptPasswordChange).toBeDefined();
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
      skip: 0,
      limit: 0,
      getCount: true,
    });

    expect(result).toBeDefined();
    expect(result.count).toBe(result.users.length);
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
