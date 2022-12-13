const userControllers = require("./controller");
const { connectDb } = require("../../config/db");
const generateRandom = require("../../helpers/generaterandonHelpers");
const userErrors = require("./error/userErrors");
const {hashingPassword,unHashingPassword} = require("../../helpers/cryptoHelper");

beforeAll(() => {
  connectDb();
});

describe("create", () => {
  test("it should  create a new user", async () => {
    const createUser = generateRandomUser();
    expect(userControllers.create).toBeInstanceOf(Function);
    const user = await userControllers.create(createUser);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe("string");
    expect(user.updatedAt).toBeDefined();
    expect(user.updatedAt).toBeInstanceOf(Date);
    expect(user.createdAt).toBeDefined();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.createdAt < user.updatedAt).toBe(false);
    expect(user.userName).toBe(createUser.userName);
    expect(user.email).toBe(createUser.email);
    expect(user.mobile).toBe(createUser.mobile);
    expect(user.password).toBe(createUser.password);
    expect(user.role).toBe(createUser.role);
    expect(user.promptPasswordChange).toBe(true);
  });

  test("it should return error message for the same email id", async () => {
    const createUser = generateRandomUser();
    expect(userControllers.create).toBeInstanceOf(Function);
    await userControllers.create(createUser);

    expect(() => userControllers.create(createUser)).rejects.toThrow(
      userErrors.UserExistsError
    );
  });

  test("it should create a user default role as a user ", async () => {
    const user = {
      userName: "testing",
      mobile: generateRandom.generateRandomNumber(55555, 1000000),
      email: `${generateRandom.generateRandomString(17)}@gmail.com`,
      password: hashingPassword(generateRandom.generateRandomString(10)),
    };
    expect(userControllers.create).toBeInstanceOf(Function);
    const resultUser = await userControllers.create(user);

    expect(resultUser).toBeDefined();
    expect(resultUser.id).toBeDefined();
    expect(typeof resultUser.id).toBe("string");
    expect(resultUser.updatedAt).toBeDefined();
    expect(resultUser.updatedAt).toBeInstanceOf(Date);
    expect(resultUser.createdAt).toBeDefined();
    expect(resultUser.createdAt).toBeInstanceOf(Date);
    expect(resultUser.createdAt <= resultUser.updatedAt).toBe(true);
    expect(resultUser.userName).toBe(user.userName);
    expect(resultUser.email).toBe(user.email);
    expect(resultUser.role).toBeDefined();
    expect(resultUser.mobile).toBe(user.mobile);
    expect(resultUser.password).toBe(user.password);
    expect(resultUser.promptPasswordChange).toBe(true);
  });

  test("it should create a user with default true promptPasswordChange", async () => {
    const user = {
      userName: "jest-testing",
      mobile: generateRandom.generateRandomNumber(55555, 1000000),
      role: "user",
      email: `${generateRandom.generateRandomString(10)}@gmail.com`,
    };
    expect(userControllers.create).toBeInstanceOf(Function);
    const resultUser = await userControllers.create(user);

    expect(resultUser).toBeDefined();
    expect(resultUser.id).toBeDefined();
    expect(typeof resultUser.id).toBe("string");
    expect(resultUser.updatedAt).toBeDefined();
    expect(resultUser.updatedAt).toBeInstanceOf(Date);
    expect(resultUser.createdAt).toBeDefined();
    expect(resultUser.createdAt).toBeInstanceOf(Date);
    expect(resultUser.createdAt <= resultUser.updatedAt).toBe(true);
    expect(resultUser.userName).toBe(user.userName);
    expect(resultUser.email).toBe(user.email);
    expect(resultUser.role).toBe(user.role);
    expect(resultUser.mobile).toBe(user.mobile);
    expect(resultUser.password).toBe(user.password);
    expect(resultUser.promptPasswordChange).toBe(true);
  });

  test("it should return error because email is mandatory field", async () => {
    let user = generateRandomUser();
    user.email = null;

    expect(userControllers.create).toBeInstanceOf(Function);
    await expect(() => userControllers.create(user)).rejects.toThrow(
      userErrors.MandatoryFieldsError
    );
  });

  test("it should return error because userName is mandatory field", async () => {
    let user = generateRandomUser();
    user.userName = null;
    expect(userControllers.create).toBeInstanceOf(Function);

    await expect(() => userControllers.create(user)).rejects.toThrow(
      userErrors.MandatoryFieldsError
    );
  });
});

/*******************************************************************************/
describe("update", () => {
  test("it should return user not found for invalid user", async () => {
    const createUser = generateRandomUser();
    expect(userControllers.create).toBeInstanceOf(Function);
    const user = await userControllers.create(createUser);
    expect(user).toBeDefined();

    const email = `${generateRandom.generateRandomString(20)}@yahoo.com`;

    expect(userControllers.getUserByEmailId).toBeInstanceOf(Function);

    expect(email != user.email).toBe(true);

    expect(() => userControllers.getUserByEmailId(email)).rejects.toThrow(
      userErrors.UserNotFoundError
    );
  });

  test("it should update the existing user with correct id ", async () => {
    const createUser = generateRandomUser();
    expect(userControllers.create).toBeInstanceOf(Function);
    const user = await userControllers.create(createUser);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe("string");

    const id = user.id;

    const newUpdateValue = generateRandomUser();
    expect(userControllers.updateById).toBeInstanceOf(Function);

    const updatedUser = await userControllers.updateById({
      id,
      ...newUpdateValue,
    });

    updatedUser.password = unHashingPassword(updatedUser.password);
    newUpdateValue.password = unHashingPassword(newUpdateValue.password);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBeDefined();
    expect(typeof updatedUser.id).toBe("string");
    expect(updatedUser.updatedAt).toBeDefined();
    expect(updatedUser.updatedAt).toBeInstanceOf(Date);
    expect(updatedUser.createdAt).toBeDefined();
    expect(updatedUser.createdAt).toBeInstanceOf(Date);
    expect(updatedUser.createdAt < updatedUser.updatedAt).toBe(true);
    expect(updatedUser.userName).toBe(newUpdateValue.userName);
    expect(updatedUser.email).toBe(newUpdateValue.email);
    expect(updatedUser.role).toBe(newUpdateValue.role);
    expect(updatedUser.mobile).toBe(newUpdateValue.mobile);
    expect(updatedUser.password == newUpdateValue.password).toBe(true);
    expect(updatedUser.promptPasswordChange).toBe(true);
  });
});
/*******************************************************************************/

describe("delete", () => {
  test("it should delete a existing user", async () => {
    const createUser = generateRandomUser();
    expect(userControllers.create).toBeInstanceOf(Function);
    const user = await userControllers.create(createUser);
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe("string");

    const id = user.id;
    expect(userControllers.deleteById).toBeInstanceOf(Function);

    const deletedUser = await userControllers.deleteById(id);

    expect(deletedUser).toBeDefined();
    expect(deletedUser.id).toBeDefined();
    expect(deletedUser.id).toBe(id);
    expect(deletedUser.updatedAt).toBeDefined();
    expect(deletedUser.updatedAt).toBeInstanceOf(Date);
    expect(deletedUser.createdAt).toBeDefined();
    expect(deletedUser.createdAt).toBeInstanceOf(Date);
    expect(deletedUser.createdAt <= deletedUser.updatedAt).toBe(true);
    expect(deletedUser.userName).toBe(createUser.userName);
    expect(deletedUser.email).toBe(createUser.email);
    expect(deletedUser.role).toBe(createUser.role);
    expect(deletedUser.mobile).toBe(createUser.mobile);
    expect(deletedUser.promptPasswordChange).toBe(true);
  });

  test("it should return not found for invalid user", async () => {
    const createUser = generateRandomUser();
    expect(userControllers.create).toBeInstanceOf(Function);
    const user = await userControllers.create(createUser);
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe("string");

    expect(userControllers.deleteById).toBeInstanceOf(Function);
    expect(() => userControllers.deleteById(null)).rejects.toThrow(
      userErrors.UserDeleteError
    );
  });
});
/*******************************************************************************/

describe("validate", () => {
  test("it should return successs if the email&password are correct", async () => {
    const createUser = generateRandomUser();
    const user = await userControllers.create(createUser);
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe("string");
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();
    user.password = unHashingPassword(user.password);

    const emailAndPassword = {
      email: createUser.email,
      password: unHashingPassword(createUser.password),
    };

    const result = await userControllers.validate(emailAndPassword);

    expect(result).toBeDefined();
    expect(result.token).toBeDefined();
    expect(result.user.id).toBeDefined();
    expect(typeof result.user.id).toBe("string");
    expect(result.user.updatedAt).toBeDefined();
    expect(result.user.updatedAt).toBeInstanceOf(Date);
    expect(result.user.createdAt).toBeDefined();
    expect(result.user.createdAt).toBeInstanceOf(Date);
    expect(result.user.createdAt <= result.user.updatedAt).toBe(true);
    expect(result.user.userName).toBe(createUser.userName);
    expect(result.user.email).toBe(createUser.email);
    expect(result.user.role).toBe(createUser.role);
    expect(result.user.mobile).toBe(createUser.mobile);
    expect(result.user.promptPasswordChange).toBe(true);
  });

  test("it should return password missmatch error for entering wrong password", async () => {
    const createUser = generateRandomUser();
    const user = await userControllers.create(createUser);

    expect(user).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.email).toBe(createUser.email);
    user.password = unHashingPassword(user.password);
    const emailAndPassword = {
      email: user.email,
      password: generateRandom.generateRandomString(10),
    };
    expect(user.password !== emailAndPassword.password).toBe(true);

    expect(() => userControllers.validate(emailAndPassword)).rejects.toThrow(
      userErrors.CredentialsMissmatchError
    );
  });

  test("it should return user not found for entering wrong email", async () => {
    const createUser = generateRandomUser();

    const user = await userControllers.create(createUser); //populating db with few users
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe("string");
    expect(user.email).toBeDefined();
    createUser.password = unHashingPassword(createUser.password);

    const emailAndPassword = {
      email: `${generateRandom.generateRandomString(15)}@gmail.com`,
      password: createUser.password,
    };
    expect(user.email !== emailAndPassword.password).toBe(true);

    expect(() => userControllers.validate(emailAndPassword)).rejects.toThrow(
      userErrors.UserNotFoundError
    );
  });

  test("it should return error because email is mandatory field", async () => {
    const createUser = generateRandomUser();
    const user = await userControllers.create(createUser); //populating db with few users
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe("string");
    expect(user.email).toBeDefined();
    expect(user.password).toBeDefined();
    createUser.password = unHashingPassword(createUser.password);

    const password = generateRandom.generateRandomString(8);
    expect(password != createUser.password).toBe(true);
    expect(() =>
      userControllers.validate({
        email: null,
        password,
      })
    ).rejects.toThrow(userErrors.MandatoryFieldsError);
  });
});
/*******************************************************************************/

describe("getAll", () => {
  test("it should return the count as 5 because we set limit as 5", async () => {
    const limit = 5;
    for (let i = 0; i < 10; i++) {
      const createUser = generateRandomUser(i); //populating db with some users
      let user = await userControllers.create(createUser);
      expect(user).toBeDefined();
    }
    expect(userControllers.getAll).toBeInstanceOf(Function);

    let result = await userControllers.getAll({
      skip: 0,
      limit: 0,
      getCount: true,
    });

    let checkLimit = Math.ceil(result.count / limit);

    const params = {
      skip: 1,
      limit: limit,
      getCount: true,
    };
    let resultUser;

    for (let i = 1; i < checkLimit + 1; i++) {
      resultUser = await userControllers.getAll({
        skip: params.skip,
        limit: params.limit,
        getCount: params.getCount,
      });
      params.getCount = false;
      params.skip = params.skip + 1;
    }

    expect(resultUser.users.length == 0).toBe(true);
  });

  test("it should get all the users from the users collection", async () => {
    for (let i = 0; i < 10; i++) {
      const createUser = generateRandomUser(i); //populating db with some users
      let user = await userControllers.create(createUser);
      expect(user).toBeDefined();
    }

    let result = await userControllers.getAll({
      skip: 0,
      limit: 0,
      getCount: true,
    });
    expect(result).toBeDefined();
    expect(result.users).toBeDefined();
    expect(result.count).toBeDefined();

    for (let user of result.users) {
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(typeof user.id).toBe("string");
      expect(user.updatedAt).toBeDefined();
      expect(user.updatedAt).toBeInstanceOf(Date);
      expect(user.createdAt).toBeDefined();
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.createdAt <= user.updatedAt).toBe(true);
      expect(user.email).toBeDefined();
      expect(user.role).toBeDefined();
      expect(user.mobile).toBeDefined();
      expect(user.promptPasswordChange).toBeDefined();
    }
  });

  test("it should return a empty [] for users not found", async () => {
    let userNames=[]
    for (let i = 0; i < 10; i++) {
      const createUser = generateRandomUser(i); //populating db with some users
      let user = await userControllers.create(createUser);
      expect(user).toBeDefined();
      userNames.push(user.userName)
    }

    const params = {
      skip: 1,
      limit: 5,
      getCount: false,
      name: "(pavan)",
    };
    expect(!userNames.includes(params.name)).toBe(true)

    let result = await userControllers.getAll(params);

    expect(result).toBeDefined();
    expect(result.users).toEqual(expect.arrayContaining([]));
  });

  test("it should return a count if we give getCount equal to true", async () => {

    for (let i = 0; i < 10; i++) {
      const createUser = generateRandomUser(i); //populating db with some users
      let user = await userControllers.create(createUser);
      expect(user).toBeDefined();
    }

    let result = await userControllers.getAll({
      skip: 0,
      limit: 0,
      getCount: true,
    });

    expect(result).toBeDefined();
    expect(result.count).toBe(result.users.length);
    for (let user of result.users) {
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(typeof user.id).toBe("string");
      expect(user.updatedAt).toBeDefined();
      expect(user.updatedAt).toBeInstanceOf(Date);
      expect(user.createdAt).toBeDefined();
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.createdAt <= user.updatedAt).toBe(true);
      expect(user.email).toBeDefined();
      expect(user.role).toBeDefined();
      expect(user.mobile).toBeDefined();
      expect(user.promptPasswordChange).toBeDefined();
    }
  });

  test("it should return a count is undefined for {getCount: false}", async () => {

    for (let i = 0; i < 10; i++) {
      const createUser = generateRandomUser();  //populating db with some users
      let user = await userControllers.create(createUser);
      expect(user).toBeDefined();
    }

    let result = await userControllers.getAll({
      skip: 0,
      limit: 5,
      getCount: false,
    });

    expect(result).toBeDefined();
    expect(result.count).toBe(undefined);
    expect(result.users).toBeDefined();

    for (let user of result.users) {
      expect(user.id).toBeDefined();
      expect(typeof user.id).toBe("string");
      expect(user.updatedAt).toBeDefined();
      expect(user.updatedAt).toBeInstanceOf(Date);
      expect(user.createdAt).toBeDefined();
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.createdAt <= user.updatedAt).toBe(true);
      expect(user.userName).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.role).toBeDefined();
      expect(user.mobile).toBeDefined();
      expect(user.promptPasswordChange).toBeDefined();
    }
  });

  test("it should return a correct count of user for the username", async () => {

    for (let i = 0; i < 10; i++) {
      const createUser = UserNameCountValidation(i);
      let user = await userControllers.create(createUser); //populating db with users
      expect(user).toBeDefined();
    }

    let result = await userControllers.getAll({
      skip: 0,
      limit: 0,
      getCount: false,
      name: "arun",
    });
    expect(result).toBeDefined();
    expect(result.count).toBe(undefined);
    expect(result.users).toBeDefined();
    expect(result.users.length).toBe(10);

    for (let user of result.users) {
      expect(user.id).toBeDefined();
      expect(typeof user.id).toBe("string");
      expect(user.updatedAt).toBeDefined();
      expect(user.updatedAt).toBeInstanceOf(Date);
      expect(user.createdAt).toBeDefined();
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.createdAt <= user.updatedAt).toBe(true);
      expect(user.userName).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.role).toBeDefined();
      expect(user.mobile).toBeDefined();
      expect(user.promptPasswordChange).toBeDefined();
    }
  });
});
/*******************************************************************************/

describe("getUserByEmailId", () => {
  test("it should throw a error for wrong email id", async () => {

    const createUser = generateRandomUser(); //populating db with user
    const user = await userControllers.create(createUser);
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe("string");

    let email = `${generateRandom.generateRandomString(15)}@gmail.com`;
    expect(email != user.email).toBe(true);

    expect(() => userControllers.getUserByEmailId(email)).rejects.toThrow(
      userErrors.UserNotFoundError
    );

  });

  test("it should return a user for correct email", async () => {

    const createUser = generateRandomUser();  //populating db with user
    const user = await userControllers.create(createUser);
    expect(user).toBeDefined();
    expect(user.id).toBeDefined()
    expect(typeof user.id).toBe('string')
    expect(user.email).toBeDefined()
    expect(user.email == createUser.email).toBe(true)

    let getUser = await userControllers.getUserByEmailId(user.email);

    expect(getUser.id).toBeDefined();
    expect(typeof getUser.id).toBe("string");
    expect(getUser.updatedAt).toBeDefined();
    expect(getUser.updatedAt).toBeInstanceOf(Date);
    expect(getUser.createdAt).toBeDefined();
    expect(getUser.createdAt).toBeInstanceOf(Date);
    expect(getUser.createdAt <= getUser.updatedAt).toBe(true);
    expect(getUser.userName).toBe(user.userName);
    expect(getUser.email).toBe(user.email);
    expect(getUser.role).toBe(user.role);
    expect(getUser.mobile).toBe(user.mobile);
    expect(getUser.promptPasswordChange).toBe(true);
  });

  test("it should return error because email is mandatory field", async () => {

    const createUser = generateRandomUser();  //populating db with some users
    const user = await userControllers.create(createUser);
    expect(user).toBeDefined();
    expect(user.id).toBeDefined()
    expect(typeof user.id).toBe('string')
    expect(user.email).toBeDefined()
    expect(user.email == createUser.email).toBe(true)

    expect(() => userControllers.getUserByEmailId(null)).rejects.toThrow(
      userErrors.MandatoryFieldsError
    );
  });
});
/*******************************************************************************/

describe("getById", () => {
  test("it should return a user by id", async () => {
    const createUser = generateRandomUser();
    const user = await userControllers.create(createUser);
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(typeof user.id).toBe("string");

    let getUser = await userControllers.getById(user.id);

    expect(getUser.id).toBeDefined();
    expect(typeof getUser.id).toBe("string");
    expect(getUser.updatedAt).toBeDefined();
    expect(getUser.updatedAt).toBeInstanceOf(Date);
    expect(getUser.createdAt).toBeDefined();
    expect(getUser.createdAt).toBeInstanceOf(Date);
    expect(getUser.createdAt <= getUser.updatedAt).toBe(true);
    expect(getUser.userName).toBe(user.userName);
    expect(getUser.email).toBe(user.email);
    expect(getUser.role).toBe(user.role);
    expect(getUser.mobile).toBe(user.mobile);
    expect(getUser.promptPasswordChange).toBe(true);
  });

  test("it should return a error for invalid id ", async () => {
    expect(() => userControllers.getById(null)).rejects.toThrow(
      userErrors.MandatoryFieldsError
    );
  });
});

const generateRandomUser = (i) => {
  const inputs = {
    userName: i ? "testing-jest"+i:"testing-jest",
    password: hashingPassword("test123"),
    mobile: generateRandom.generateRandomNumber(55555, 1000000),
    role: "user",
    email: `${generateRandom.generateRandomString(10)}@gmail.com`,
  };
  return inputs;
};
const UserNameCountValidation = (i) => {
  return {
    userName: `arun${i}`,
    email: `${generateRandom.generateRandomString(10)}@gmail.com`,
    password: hashingPassword(generateRandom.generateRandomString(6)),
    mobile: 8236438,
    role: "user",
  };
};
