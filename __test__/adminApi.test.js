let supertest = require("supertest");
const { AdminErrorCodes } = require("../apis/admin/error/adminErrors");
const app = require("../server");
const { HTTPErrorCodes } = require("../apis/user/error/userErrors");
const generateRandom = require(".././helpers/generaterandonHelpers");
const crypto = require("../helpers/cryptoHelper");
// //!admin
let adminBaseRoute = "admin";
//http://localhost:5000/auth/admin
describe("/admin register", () => {
  test("test should create new admin user", async () => {
    let adminUser = generateRandomAdmin();
    console.log(adminUser);
    await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);
  });

  test("test should return error for same admin mail id", async () => {
    let adminUser = generateRandomAdmin();
    await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);

    await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(AdminErrorCodes.ENTITY_ALREADY_EXISTS);
  });
});

//http://localhost:5000/auth/admin/login
describe("/admin login", () => {
  test("test should check a admin is existing", async () => {
    let adminUser = generateRandomAdmin();
    await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);

    await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}` + `/login`)
      .send(adminUser)
      .expect(200);
  });

  test("test should check a admin is existing with wrong credentials", async () => {
    let adminUser = generateRandomAdmin();
    await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);

    await supertest(app)
      .post(`/api/v1/${adminBaseRoute}/login`)
      .send({
        email: adminUser.email,
        password: "admin13",
        role: adminUser.role,
      })
      .expect(AdminErrorCodes.CREDENTIALS_MISSMATCH);
  });
});

//http://localhost:5000/auth/admin
describe("/admin update", () => {
  test("test should update the existing admin user with the email", async () => {
    let adminUser = generateRandomAdmin();
    await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);

    await supertest(app)
      .put(`/api/v1/` + `${adminBaseRoute}`)
      .send({
        email: adminUser.email,
        password: "admin123",
        role: adminUser.role,
      })
      .expect(200);
  });

  test("test should  return update failed  with wrong email", async () => {
    let adminUser = generateRandomAdmin();
    await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);

    await supertest(app)
      .put(`/api/v1/` + `${adminBaseRoute}`)
      .send({
        email: "admin10000@gmail.com",
        password: "admin154",
        role: adminUser.role,
      })
      .expect(AdminErrorCodes.ENTITY_UPDATE_FAILED);
  });
});

//http://localhost:5000/auth/admin?email=demo@gmail.com

describe("/admin delete", () => {
  test("test should deleting a existing admin user", async () => {
    let adminUser = generateRandomAdmin();
    await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);

    await supertest(app)
      .delete(`/api/v1/` + `${adminBaseRoute}` + `?email=` + adminUser.email)
      .expect(200);
  });

  test("test should return 400 without query mail id", async () => {
    let adminUser = generateRandomAdmin();
    await supertest(app)
      .post(`/api/v1/` + `${adminBaseRoute}`)
      .send(adminUser)
      .expect(200);

    await supertest(app)
      .delete(`/api/v1/` + `${adminBaseRoute}` + `?email=`)
      .expect(AdminErrorCodes.VALIDATION_ERROR);
  });
});

//http:localhost:5000/*
describe("/not found routes", () => {
  test("test should return not found 404", async () => {
    await supertest(app).get(`/admin/`).expect(AdminErrorCodes.NOT_FOUND);
  });
});


const generateRandomAdmin = (i) => {
  let admin = {
    email: i
      ? `${generateRandom.generateRandomString(10) + i}@gmail.com`
      : `${generateRandom.generateRandomString(10)}@gmail.com`,
    password: generateRandom.generateRandomString(7),
  };
  return admin;
};
