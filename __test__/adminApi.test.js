const supertest = require("supertest");
const app = require("../server");
const { HTTPErrorCodes } = require("../apis/user/error/userErrors");
const generateRandom = require(".././helpers/generaterandonHelpers");
const crypto = require("../helpers/cryptoHelper");
// //!admin
const adminBaseRoute = "admin";
//http://localhost:5000/api/v1/api/v1/auth/admin
describe("/admin register", () => {
  test("test should create new admin user", async () => {
    const adminUser = generateRandomAdmin();
    const response = await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser);

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    const result = response._body.admin;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(typeof result._id).toBe("string");
    expect(result.email).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.email).toBe(adminUser.email);
    expect(crypto.unHashingPassword(result.password)).toBe(adminUser.password);
  });

  test("test should return error for same admin mail id", async () => {
    const adminUser = generateRandomAdmin();
    const adminUserResponse = await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser);
    expect(adminUserResponse).toBeDefined();
    expect(adminUserResponse.statusCode).toBe(200);
    const result = adminUserResponse._body.admin;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.email).toBe(adminUser.email);

    const response = await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser);
    expect(response.statusCode).toBe(HTTPErrorCodes.ENTITY_ALREADY_EXISTS);
  });

  test("it should return status-400 for {email:required}", async () => {
    const response = await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send({ email: undefined, password: "1234567" });
    expect(response.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });

  test("it should return status-400 for {password:required}", async () => {
    const response = await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send({
        email: `${generateRandom.generateRandomString(15)}@gmail.com`,
        password: undefined,
      });
    expect(response.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });
});

//http://localhost:5000/api/v1/auth/admin/login
describe("/admin login", () => {
  test("test should check a admin is existing", async () => {
    const adminUser = generateRandomAdmin();
    const adminUserResponse = await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);
    expect(adminUserResponse).toBeDefined();
    expect(adminUserResponse.statusCode).toBe(200);
    const result = adminUserResponse._body.admin;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.email).toBe(adminUser.email);

    let validateAdminResponse = await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}` + `/login`)
      .send(adminUser);

    expect(validateAdminResponse.statusCode).toBe(200);
    expect(validateAdminResponse).toBeDefined();
    console.log(validateAdminResponse._body);
    expect(validateAdminResponse._body.admin.admin).toBeDefined();
    expect(validateAdminResponse._body.admin.token).toBeDefined();
    const admin = validateAdminResponse._body.admin.admin;
    expect(admin).toBeDefined();
    expect(admin._id).toBeDefined();
    expect(typeof admin._id).toBe("string");
    expect(admin.password).toBeDefined();
    expect(admin.email).toBeDefined();
    expect(crypto.unHashingPassword(result.password)).toBe(adminUser.password);
    expect(admin.email).toBe(result.email);
  });

  test("test should check a admin is existing with wrong credentials", async () => {
    const adminUser = generateRandomAdmin();
    const adminUserResponse = await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`) //populating db with some user
      .send(adminUser)
      .expect(200);
    expect(adminUserResponse).toBeDefined();
    expect(adminUserResponse.statusCode).toBe(200);
    const result = adminUserResponse._body.admin;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.email).toBe(adminUser.email);

    const password = generateRandom.generateRandomString(10);
    expect(password != adminUser.password).toBe(true);
    const validateAdminResponse = await supertest(app)
      .post(`/api/v1/${adminBaseRoute}/login`)
      .send({
        email: adminUser.email,
        password: password,
      });
    expect(validateAdminResponse.statusCode).toBe(
      HTTPErrorCodes.CREDENTIAL_MISSMATCH
    );
  });

  test("it should return status-400 for {email:required}", async () => {
    const response = await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}/login`)
      .send({ email: undefined, password: "1234567" });
    expect(response.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });

  test("it should return status-400 for {password:required}", async () => {
    const response = await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}/login`)
      .send({
        email: `${generateRandom.generateRandomString(15)}@gmail.com`,
        password: undefined,
      });
    expect(response.statusCode).toBe(HTTPErrorCodes.VALIDATION_ERROR);
  });
});

//http://localhost:5000/api/v1/auth/admin
describe("/admin update", () => {
  test("test should update the existing admin user with the email", async () => {
    const adminUser = generateRandomAdmin();
    const adminUserResponse = await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);
    expect(adminUserResponse).toBeDefined();
    expect(adminUserResponse.statusCode).toBe(200);
    const result = adminUserResponse._body.admin;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.email).toBe(adminUser.email);

    const password=generateRandom.generateRandomString(10)
    let updateAdminResponse=await supertest(app)
      .put(`/api/v1/` + `${adminBaseRoute}`)
      .send({
        email: adminUser.email,
        password: password,
      })
      expect(updateAdminResponse.statusCode).toBe(200);
      expect(updateAdminResponse).toBeDefined();
      expect(updateAdminResponse.statusCode).toBe(200);
      const updateAdminresult = updateAdminResponse._body.admin;
      expect(updateAdminresult.modifiedCount==1).toBe(true);
  });

   test.only("test should  return update failed  with wrong email", async () => {
    const adminUser = generateRandomAdmin();
    const adminUserResponse = await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);
    expect(adminUserResponse).toBeDefined();
    expect(adminUserResponse.statusCode).toBe(200);
    const result = adminUserResponse._body.admin;
    expect(result).toBeDefined();
    expect(result._id).toBeDefined();
    expect(result.email).toBeDefined();
    expect(result.password).toBeDefined();
    expect(result.email).toBe(adminUser.email);

    const email=`${generateRandom.generateRandomString(10)}@gmail.com`
    expect(email!=result.email).toBe(true)
    let updateAdminResponse=await supertest(app)
      .put(`/api/v1/` + `${adminBaseRoute}`)
      .send({
        email: email,
        password: '12344455',
      })
      expect(updateAdminResponse.statusCode).(HTTPErrorCodes.ENTITY_NOT_FOUND);
  });
});

//http://localhost:5000/api/v1/auth/admin?email=demo@gmail.com

describe("/admin delete", () => {
  test("test should deleting a existing admin user", async () => {
    const adminUser = generateRandomAdmin();
    await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);

    await supertest(app)
      .delete(`/api/v1/` + `${adminBaseRoute}` + `?email=` + adminUser.email)
      .expect(200);
  });

  test("test should return 400 without query mail id", async () => {
    const adminUser = generateRandomAdmin();
    await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);

    await supertest(app)
      .delete(`/api/v1/` + `${adminBaseRoute}` + `?email=`)
      .expect(HTTPErrorCodes.VALIDATION_ERROR);
  });
});

//http:localhost:5000/api/v1/*
describe("/not found routes", () => {
  test("test should return not found 404", async () => {
    await supertest(app).get(`/admin/`).expect(404);
  });
});

const generateRandomAdmin = (i) => {
  const admin = {
    email: i
      ? `${generateRandom.generateRandomString(10) + i}@gmail.com`
      : `${generateRandom.generateRandomString(10)}@gmail.com`,
    password: generateRandom.generateRandomString(7),
  };
  return admin;
};
