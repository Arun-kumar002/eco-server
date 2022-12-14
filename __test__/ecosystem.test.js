let supertest = require("supertest");
const app = require("../server");
const { UserErrorCodes } = require("../apis/user/error/userErrors");
const { AdminErrorCodes } = require("../apis/admin/error/adminErrors");
const generateRandom = require(".././helpers/generaterandonHelpers");

let baseRoute = "api/v1/user";

//TODO get requests
//http://localhost:5000/user?limit=0&skip=0&getCount=true
describe("/user get", () => {
  test("test should return all user", async () => {
    await supertest(app)
      .get(`/${baseRoute}?limit=5&skip=1&getCount=true`)
      .expect(200);
  });

  test("test should return 400 for missing query", async () => {
    await supertest(app)
      .get(`/${baseRoute}?limit=0&skip=0`)
      .expect(UserErrorCodes.VALIDATION_ERROR);
  });
});

//TODO post requests
//http://localhost:5000/user
describe("/user post", () => {
  test("test should create a new user", async () => {
    let inputs = generateRandomUser();
    await supertest(app).post(`/${baseRoute}/`).send(inputs).expect(200);
  });
  
  
  test("test should return 400 user already present", async () => {
    let inputs = generateRandomUser();
    await supertest(app).post(`/${baseRoute}/`).send(inputs).expect(200); //populating db with some users
    await supertest(app)
    .post(`/${baseRoute}/`)
    .send(inputs)
    .expect(UserErrorCodes.ENTITY_ALREADY_EXISTS);
  });
});
//http://localhost:5000/user/login
describe("/user login", () => {
  test("test should check a user is existing", async () => {
    let inputs = generateRandomUser();
    await supertest(app).post(`/${baseRoute}/`).send(inputs).expect(200); //populate db with some users

    await supertest(app)
      .post(`/${baseRoute}` + `/login`)
      .send({ email: inputs.email, password: inputs.password })
      .expect(200);
  });
  
  test("test should check a user login with wrong credentials", async () => {
    let inputs = generateRandomUser();
    await supertest(app).post(`/${baseRoute}/`).send(inputs).expect(200); //populate db with some user
    
    await supertest(app)
    .post(`/${baseRoute}` + `/login`)
    .send({ email: inputs.email, password:generateRandom.generateRandomString(7) })
    .expect(UserErrorCodes.CREDENTIAL_MISSMATCH);
  });
});

//TODO put request
//http://localhost:5000/user/:id
describe("/user update ", () => {
  test("test should updating a existing user", async () => {
    let inputs = generateRandomUser();
    await supertest(app).post(`/${baseRoute}/`).send(inputs).expect(200); //populate db with some user

    let getinguserid = await supertest(app)
      .post(`/${baseRoute}` + `/id`)
      .send({
        email: inputs.email,
      })
      .expect(200);

    let parse = JSON.parse(getinguserid.text);
    let id = parse.user;

    console.log("updateuser-id");
    await supertest(app)
      .put(`/${baseRoute}` + `/${id}`)
      .send({ ...inputs })
      .expect(200);
  });
});

//TODO delete request
//http://localhost:5000/user/6390725d04412d860821ef72
describe("/user delete", () => {
  test("test should delete a existing user", async () => {
    let inputs = generateRandomUser();
    await supertest(app).post(`/${baseRoute}/`).send(inputs).expect(200);

    let getinguserid = await supertest(app)
      .post(`/${baseRoute}` + `/id`)
      .send({
        email: inputs.email,
      })
      .expect(200);
    let parse = JSON.parse(getinguserid.text);
    let id = parse.user;

    await supertest(app).delete(`/${baseRoute}/${id}`).expect(200);
  });
});


/************************************************************************/
// //!admin
let adminBaseRoute='admin'
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
  
  test("test should return 400 for same admin mail id", async () => {
    let adminUser = generateRandomAdmin();
    await supertest(app)
    .post(`/api/v1/` + `${adminBaseRoute}`)
    .send(adminUser)
    .expect(200);

    await supertest(app)
    .post(`/api/v1/` + `${adminBaseRoute}`)
    .send(adminUser)
    .expect(403);
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

const generateRandomAdmin = (i) => {
  let admin = {
    email: i
      ? `${generateRandom.generateRandomString(10) + i}@gmail.com`
      : `${generateRandom.generateRandomString(10)}@gmail.com`,
    password: generateRandom.generateRandomString(7),
  };
  return admin;
};
