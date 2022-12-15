let supertest = require("supertest");
const app = require("../server");
const { HTTPErrorCodes } = require("../apis/user/error/userErrors");
const generateRandom = require("../helpers/generaterandonHelpers");
const crypto = require("../helpers/cryptoHelper");

let baseRoute = "api/v1/user";

//TODO post requests
//http://localhost:5000/user
describe("/user post", () => {
  test("test should create a new user", async () => {
    let createUser = generateRandomUser();
    let response = await supertest(app).post(`/${baseRoute}/`).send(createUser);
    expect(response).toBeDefined();
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.statusCode).toBe(200);
    let result = response._body.user;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(typeof result._id).toBe("string");
    expect(result.userName).toBeDefined();
    expect(result.mobile).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.role).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.userName).toBe(createUser.userName);
    expect(result.mobile).toBe(createUser.mobile);
    expect(crypto.unHashingPassword(result.password)).toBe(createUser.password);
    expect(result.email).toBe(createUser.email);
    expect(result.role).toBe(createUser.role);
  });

  test("test should return 400 user already present", async () => {
    let createUser = generateRandomUser();
    await supertest(app).post(`/${baseRoute}/`).send(createUser).expect(200); //populating db with some users
    let response = await supertest(app).post(`/${baseRoute}/`).send(createUser);
    expect(response.statusCode).toBe(HTTPErrorCodes.ENTITY_ALREADY_EXISTS);
  });
});
//http://localhost:5000/user/login
describe("/user login", () => {
  test("test should check a user is existing", async () => {
    let createUser = generateRandomUser();

    let response = await supertest(app).post(`/${baseRoute}/`).send(createUser);
    //populating db
    expect(response.statusCode).toBe(200);
    let result = response._body.user;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(typeof result._id).toBe("string");
    expect(result.password).toBeDefined();
    expect(result.email).toBeDefined();

    let validateUserResponse = await supertest(app)
      .post(`/${baseRoute}` + `/login`)
      .send({ email: createUser.email, password: createUser.password });

    expect(validateUserResponse.statusCode).toBe(200);
    expect(validateUserResponse).toBeDefined();
    expect(validateUserResponse._body.user.user).toBeDefined();
    expect(validateUserResponse._body.user.token).toBeDefined();
    let user = validateUserResponse._body.user.user;
    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
    expect(typeof user._id).toBe("string");
    expect(user.userName).toBeDefined();
    expect(user.mobile).toBeDefined();
    expect(user.password).toBeDefined();
    expect(user.role).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.userName).toBe(result.userName);
    expect(user.mobile).toBe(result.mobile);
    expect(crypto.unHashingPassword(result.password)).toBe(user.password);
    expect(user.email).toBe(result.email);
    expect(user.role).toBe(result.role);
  });

  test("test should check a user login with wrong credentials", async () => {
    let createUser = generateRandomUser();

    let response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser)
      .expect(200); //populating db
    let user = response._body.user;
    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
    expect(typeof user._id).toBe("string");
    expect(user.password).toBeDefined();
    expect(user.email).toBeDefined();

    let validateUserResponse = await supertest(app)
      .post(`/${baseRoute}` + `/login`)
      .send({
        email: user.email,
        password: generateRandom.generateRandomString(7),
      });
    expect(validateUserResponse.statusCode).toBe(
      HTTPErrorCodes.CREDENTIAL_MISSMATCH
    );
  });
});

//TODO get requests
//http://localhost:5000/user?limit=0&skip=0&getCount=true
describe("/user get", () => {
  test("test should return all user", async () => {
    for (let i = 0; i < 10; i++) {
      const createUser = generateRandomUser(i); //populating db with some users
      let response = await supertest(app)
        .post(`/${baseRoute}/`)
        .send(createUser)
        .expect(200);
      expect(response).toBeDefined();
    }

    let result = await supertest(app)
      .get(`/${baseRoute}?limit=5&skip=1&getCount=true`)
      .expect(200);
    expect(result._body).toBeDefined();
    expect(result._body.users.users).toBeDefined();
    expect(result._body.users.count).toBeDefined();

    for (let user of result._body.users.users) {
      expect(user).toBeDefined();
      expect(user._id).toBeDefined();
      expect(typeof user._id).toBe("string");
      expect(user.updatedAt).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.createdAt <= user.updatedAt).toBe(true);
      expect(user.email).toBeDefined();
      expect(user.role).toBeDefined();
      expect(user.mobile).toBeDefined();
      expect(user.promptPasswordChange).toBeDefined();
    }
  });

  test("test should return 400 for missing query", async () => {
    let response = await supertest(app).get(`/${baseRoute}?limit=0&skip=0`);
    expect(response.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });
});

//TODO put request
//http://localhost:5000/user/:id
describe("/user update ", () => {
  test("test should updating a existing user", async () => {
    const createUser = generateRandomUser();
    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser);
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200); //populate db with some user
    expect(response._body.user).toBeDefined();
    expect(response._body.user._id).toBeDefined();
    const id = response._body.user._id;

    const updateUser = generateRandomUser();
    let updateResponse = await supertest(app)
      .put(`/${baseRoute}` + `/${id}`)
      .send(updateUser);

    expect(updateResponse).toBeDefined();
    expect(updateResponse.statusCode).toBe(200);
    let result = updateResponse._body.user;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(typeof result._id).toBe("string");
    expect(result.userName).toBeDefined();
    expect(result.mobile).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.role).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.userName).toBe(updateUser.userName);
    expect(result.mobile).toBe(updateUser.mobile);
    expect(crypto.unHashingPassword(result.password)).toBe(updateUser.password);
    expect(result.email).toBe(updateUser.email);
    expect(result.role).toBe(updateUser.role);
  });
});

//TODO delete request
//http://localhost:5000/user/6390725d04412d860821ef72
describe("/user delete", () => {
  test("test should delete a existing user", async () => {
    const createUser = generateRandomUser();
    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser)
      .expect(200);
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response._body.user).toBeDefined();
    expect(response._body.user._id).toBeDefined();
    const id = response._body.user._id;

    let deleteResponse=await supertest(app).delete(`/${baseRoute}/${id}`)
    expect(deleteResponse.statusCode).toBe(200);
    let result = deleteResponse._body.user;

    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(typeof result._id).toBe("string");
    expect(result.userName).toBeDefined();
    expect(result.mobile).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.role).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.userName).toBe(createUser.userName);
    expect(result.mobile).toBe(createUser.mobile);
    expect(crypto.unHashingPassword(result.password)).toBe(createUser.password);
    expect(result.email).toBe(createUser.email);
    expect(result.role).toBe(createUser.role);
  });
});


/************************************************************************/
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
