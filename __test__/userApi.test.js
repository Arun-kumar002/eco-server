const supertest = require("supertest");
const app = require("../server");
const { HTTPErrorCodes } = require("../apis/user/error/userErrors");
const generateRandom = require("../helpers/generaterandonHelpers");
const crypto = require("../helpers/cryptoHelper");

const baseRoute = "api/v1/user";

//TODO post requests
//http://localhost:5000/api/v1/user
describe("/user post", () => {
  test("test should create a new user", async () => {
    const createUser = generateRandomUser();
    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser)
      
    expect(response).toBeDefined();
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.statusCode).toBe(200);
    const result = response._body.user;
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

  test("test should return 401 Entity already present", async () => {
    const createUser = generateRandomUser();
    await supertest(app).post(`/${baseRoute}/`).send(createUser).expect(200); //populating db with some users
    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser);
    expect(response.statusCode).toBe(HTTPErrorCodes.ENTITY_ALREADY_EXISTS);
  });

  test("test should return 400 for validation fail {userName:required}", async () => {
    const createUser = generateRandomUser();
    createUser.userName = undefined;
    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser);
    expect(response.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });

  test("test should return 400 for validation fail {email:required}", async () => {
    const createUser = generateRandomUser();
    createUser.email = undefined;
    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser);
    expect(response.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });

  test("test should create a user without {password:Not required}", async () => {
    const createUser = generateRandomUser();
    createUser.password = undefined;
    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser);
    expect(response.statusCode).toBe(200);
    expect(response).toBeDefined();
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.statusCode).toBe(200);
    const result = response._body.user;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(typeof result._id).toBe("string");
    expect(result.userName).toBeDefined();
    expect(result.mobile).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.role).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.userName).toBe(createUser.userName);
    expect(result.password).toBeDefined();
    expect(result.mobile).toBe(createUser.mobile);
    expect(result.email).toBe(createUser.email);
    expect(result.role).toBe(createUser.role);
  });

  test("test should create a user without {role:Not required}", async () => {
    const createUser = generateRandomUser();
    createUser.role = undefined;
    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser);
    expect(response.statusCode).toBe(200);
    expect(response).toBeDefined();
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.statusCode).toBe(200);
    const result = response._body.user;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(typeof result._id).toBe("string");
    expect(result.userName).toBeDefined();
    expect(result.mobile).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.role).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.userName).toBe(createUser.userName);
    expect(crypto.unHashingPassword(result.password)).toBe(createUser.password);
    expect(result.mobile).toBe(createUser.mobile);
    expect(result.email).toBe(createUser.email);
    expect(result.role).toBe("user");
  });
});

//http://localhost:5000/api/v1/user/login
describe("/user login", () => {
  test("test should check a user is existing", async () => {
    const createUser = generateRandomUser();

    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser);
    //populating db
    expect(response.statusCode).toBe(200);
    const result = response._body.user;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(typeof result._id).toBe("string");
    expect(result.password).toBeDefined();
    expect(result.email).toBeDefined();

    const validateUserResponse = await supertest(app)
      .post(`/${baseRoute}` + `/login`)
      .send({ email: createUser.email, password: createUser.password });

    expect(validateUserResponse.statusCode).toBe(200);
    expect(validateUserResponse).toBeDefined();
    expect(validateUserResponse._body.user.user).toBeDefined();
    expect(validateUserResponse._body.user.token).toBeDefined();
    const user = validateUserResponse._body.user.user;
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

  test("test should check a user login with wrong email& password", async () => {
    const createUser = generateRandomUser();

    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser)
      .expect(200); //populating db

    const user = response._body.user;
    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
    expect(typeof user._id).toBe("string");
    expect(user.password).toBeDefined();
    expect(user.email).toBeDefined();

    const validateUserResponse = await supertest(app)
      .post(`/${baseRoute}` + `/login`)
      .send({
        email: user.email,
        password: generateRandom.generateRandomString(7),
      });
    expect(validateUserResponse.statusCode).toBe(
      HTTPErrorCodes.CREDENTIAL_MISSMATCH
    );
  });

  test("test should return 400 for validation fail {email:required}", async () => {
    const createUser = generateRandomUser();

    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser)
      .expect(200); //populating db

    const user = response._body.user;
    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
    expect(typeof user._id).toBe("string");
    expect(user.password).toBeDefined();
    expect(user.email).toBeDefined();

    const validateUserResponse = await supertest(app)
      .post(`/${baseRoute}` + `/login`)
      .send({
        email: undefined,
        password: user.password,
      });

    expect(validateUserResponse.statusCode).toBe(
      HTTPErrorCodes.VALIDATION_ERROR
    );
  });

  test("test should return 400 for validation fail {password:required}", async () => {
    const createUser = generateRandomUser();

    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser)
      .expect(200); //populating db

    const user = response._body.user;
    expect(user).toBeDefined();
    expect(user._id).toBeDefined();
    expect(typeof user._id).toBe("string");
    expect(user.password).toBeDefined();
    expect(user.email).toBeDefined();

    const validateUserResponse = await supertest(app)
      .post(`/${baseRoute}` + `/login`)
      .send({ email: user.emil, password: undefined });

    expect(validateUserResponse.statusCode).toBe(
      HTTPErrorCodes.VALIDATION_ERROR
    );
  });
});

//TODO get requests
//http://localhost:5000/api/v1/user?limit=0&skip=0&getCount=true

describe("/user getAllUser", () => {
  test("test should return all user", async () => {
    for (let i = 0; i < 10; i++) {
      const createUser = generateRandomUser(i); //populating db with some users
      const response = await supertest(app)
        .post(`/${baseRoute}/`)
        .send(createUser)
        .expect(200);
      expect(response).toBeDefined();
    }

    const result = await supertest(app)
      .get(`/${baseRoute}?limit=5&skip=1&getCount=true`)
      .expect(200);
    expect(result._body).toBeDefined();
    expect(result._body.users.users).toBeDefined();
    expect(result._body.users.count).toBeDefined();

    for (const user of result._body.users.users) {
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

  test("test should return 400 for missing query {getCount:required}", async () => {
    const response = await supertest(app).get(`/${baseRoute}?limit=0&skip=0`);
    expect(response.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });

  test("test should return 400 for missing query {skip:required}", async () => {
    const response = await supertest(app).get(
      `/${baseRoute}?getCount=true&limit=0`
    );
    expect(response.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });

  test("test should return 400 for missing query {limit:required}", async () => {
    const response = await supertest(app).get(
      `/${baseRoute}?limit=0&getCount=true`
    );
    expect(response.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });

  test("test should return 400 for wrong query {skip:-1}", async () => {
    const response = await supertest(app).get(
      `/${baseRoute}?limit=0&skip=-1&getCount=true`
    );
    expect(response.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });

  test("test should return 400 for wrong query {limit:-1}", async () => {
    const response = await supertest(app).get(
      `/${baseRoute}?limit=-1&skip=0&getCount=true`
    );
    expect(response.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });
});

//http://localhost:5000/api/v1/user/:id

describe("/user getUser", () => {
  test("it should return a user if userId is valid", async () => {
    const createUser = generateRandomUser(); //populating db with some users
    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser)
      .expect(200);

    expect(response).toBeDefined();
    const result = response._body.user;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();

    const getUserResponse = await supertest(app).get(
      `/${baseRoute}/${result._id}`
    );

    expect(getUserResponse.statusCode).toBe(200);
    expect(getUserResponse).toBeDefined();
    expect(getUserResponse._body.user).toBeDefined();
    const getUserresult = getUserResponse._body.user;
    expect(getUserresult).toBeDefined();
    expect(getUserresult._id).toBeDefined();
    expect(typeof getUserresult._id).toBe("string");
    expect(getUserresult.updatedAt).toBeDefined();
    expect(getUserresult.createdAt).toBeDefined();
    expect(getUserresult.createdAt <= getUserresult.updatedAt).toBe(true);
    expect(getUserresult.email).toBeDefined();
    expect(getUserresult.role).toBeDefined();
    expect(getUserresult.mobile).toBeDefined();
    expect(getUserresult.promptPasswordChange).toBeDefined();

  });
  test("test should return 400 for  params mongo id:invalid", async () => {

    const id = generateRandom.generateRandomString(24);
    const updateResponse = await supertest(app).get(
      `/${baseRoute}` + `/${id}`
    );

    expect(updateResponse.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });

  test("test should return 400 for  params {id:required}", async () => {
    const updateUser = generateRandomUser();
    const id = undefined;
    const updateResponse = await supertest(app)
      .put(`/${baseRoute}` + `/${id}`)
      .send(updateUser);

    expect(updateResponse.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });
  test("test should return 404 for not providing params", async () => {
    const updateUser = generateRandomUser();
    const updateResponse = await supertest(app)
      .put(`/${baseRoute}` + `/`)
      .send(updateUser);

    expect(updateResponse.statusCode).toBe(404);
  });
});
//TODO put request
//http://localhost:5000/api/v1/user/:id
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
    const updateResponse = await supertest(app)
      .put(`/${baseRoute}` + `/${id}`)
      .send(updateUser);

    expect(updateResponse).toBeDefined();
    expect(updateResponse.statusCode).toBe(200);
    const result = updateResponse._body.user;
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

  test("test should return 400 for  params mongo id:invalid", async () => {
    const id = generateRandom.generateRandomString(24);
    const updateResponse = await supertest(app).delete(
      `/${baseRoute}` + `/${id}`
    );

    expect(updateResponse.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });

  test("test should return 400 for  params {id:required}", async () => {
    const updateUser = generateRandomUser();
    const id = undefined;
    const updateResponse = await supertest(app)
      .put(`/${baseRoute}` + `/${id}`)
      .send(updateUser);

    expect(updateResponse.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });
  test("test should return 404 for not providing params", async () => {
    const updateUser = generateRandomUser();
    const updateResponse = await supertest(app)
      .put(`/${baseRoute}` + `/`)
      .send(updateUser);

    expect(updateResponse.statusCode).toBe(404);
  });
});

//TODO delete request
//http://localhost:5000/api/v1/user/6390725d04412d860821ef72
describe("/user delete", () => {
  test("test should delete a existing user", async () => {
    const createUser = generateRandomUser();
    const response = await supertest(app)
      .post(`/${baseRoute}/`)
      .send(createUser);
    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response._body.user).toBeDefined();
    expect(response._body.user._id).toBeDefined();
    const id = response._body.user._id;

    const deleteResponse = await supertest(app).delete(`/${baseRoute}/${id}`);
    expect(deleteResponse.statusCode).toBe(200);
    const result = deleteResponse._body.user;

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

  test("test should return 400 for  params id:required", async () => {
    const id = undefined;
    const deleteResponse = await supertest(app).delete(
      `/${baseRoute}` + `/${id}`
    );

    expect(deleteResponse.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });
  test("test should return 404 for not providing params", async () => {
    const deleteResponse = await supertest(app).delete(`/${baseRoute}` + `/`);

    expect(deleteResponse.statusCode).toBe(404);
  });

  test("test should return 400 for  params mongo id:invalid", async () => {
    const id = generateRandom.generateRandomString(24);
    const deleteResponse = await supertest(app).delete(
      `/${baseRoute}` + `/${id}`
    );

    expect(deleteResponse.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
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
afterAll(async () => {
  
});