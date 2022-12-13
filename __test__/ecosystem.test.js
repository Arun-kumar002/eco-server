let supertest = require("supertest");
const app = require("../server");
const { UserErrorCodes } = require("../apis/user/error/userErrors");
const { AdminErrorCodes } = require("../apis/admin/error/adminErrors");
let baseRoute = "api/v1/user";

describe("user test", () => {
  let inputs = {
    userName: "testing-jest",
    email: "testing@gmail.com",
    mobile: "45123784357",
    password: "test123",
    role: "user",
  };
  //TODO get requests
  //http://localhost:5000/user?limit=0&skip=0&getCount=true
  describe("/user get", () => {
    test("test should return all user", async () => {
      await supertest(app)
        .get(`/${baseRoute}?limit=5&skip=1&getCount=true`)
        .expect(200);
    });
  });

  describe("/user get", () => {
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
      await supertest(app).post(`/${baseRoute}/`).send(inputs).expect(200);
    });
  });

  describe("/user post", () => {
    test("test should return 400 user already present", async () => {
      await supertest(app)
        .post(`/${baseRoute}/`)
        .send(inputs)
        .expect(UserErrorCodes.ENTITY_ALREADY_EXISTS);
    });
  });
  //http://localhost:5000/user/login
  describe("/user login", () => {
    test("test should check a user is existing", async () => {
      await supertest(app)
        .post(`/${baseRoute}` + `/login`)
        .send({ email: inputs.email, password: inputs.password })
        .expect(200);
    });
  });

  describe("/user login", () => {
    test("test should check a user login with wrong credentials", async () => {
      await supertest(app)
        .post(`/${baseRoute}` + `/login`)
        .send({ email: inputs.email, password: "123455" })
        .expect(UserErrorCodes.CREDENTIAL_MISSMATCH);
    });
  });

  //TODO put request
  //http://localhost:5000/user/:id
  describe("/user update ", () => {
    test("test should updating a existing user", async () => {
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

  //http:localhost:5000/*
  describe("/not found routes", () => {
    test("test should return not found 404", async () => {
      await supertest(app).get(`/arun`).expect(UserErrorCodes.NOT_FOUNT);
    });
  });
});

// //!admin
describe("admin", () => {
  let admininputs = {
    email: "admin1000@gmail.com",
    password: "admin123",
    role: "admin",
  };
  let baseRoute = "admin";

  //http://localhost:5000/auth/admin
  describe("/admin register", () => {
    test("test should create new admin user", async () => {
      await supertest(app)
        .post(`/api/v1/` + `${baseRoute}`)
        .send(admininputs)
        .expect(200);
    });
  });

  describe("/admin register", () => {
    test("test should return 400 for same admin mail id", async () => {
      await supertest(app)
        .post(`/api/v1/` + `${baseRoute}`)
        .send(admininputs)
        .expect(403);
    });
  });

  //http://localhost:5000/auth/admin/login
  describe("/admin login", () => {
    test("test should check a admin is existing", async () => {
      await supertest(app)
        .post(`/api/v1/` + `${baseRoute}` + `/login`)
        .send(admininputs)
        .expect(200);
    });
  });

  describe("/admin login", () => {
    test("test should check a admin is existing with wrong credentials", async () => {
      await supertest(app)
        .post(`/api/v1/${baseRoute}/login`)
        .send({
          email: admininputs.email,
          password: "admin13",
          role: admininputs.role,
        })
        .expect(AdminErrorCodes.CREDENTIALS_MISSMATCH);
    });
  });
  //http://localhost:5000/auth/admin
  describe("/admin update", () => {
    test("test should update the existing admin user with the email", async () => {
      await supertest(app)
        .put(`/api/v1/` + `${baseRoute}`)
        .send({
          email: admininputs.email,
          password: "admin123",
          role: admininputs.role,
        })
        .expect(200);
    });
  });

  describe("/admin update", () => {
    test("test should  return update failed  with wrong email", async () => {
      await supertest(app)
        .put(`/api/v1/` + `${baseRoute}`)
        .send({
          email: "admin10000@gmail.com",
          password: "admin154",
          role: admininputs.role,
        })
        .expect(AdminErrorCodes.ENTITY_UPDATE_FAILED);
    });
  });

  //http://localhost:5000/auth/admin?email=demo@gmail.com

  describe("/admin delete", () => {
    test("test should deleting a existing admin user", async () => {
      await supertest(app)
        .delete(`/api/v1/` + `${baseRoute}` + `?email=` + admininputs.email)
        .expect(200);
    });
  });

  describe("/admin delete", () => {
    test("test should return 400 without query mail id", async () => {
      await supertest(app)
        .delete(`/api/v1/` + `${baseRoute}` + `?email=`)
        .expect(AdminErrorCodes.VALIDATION_ERROR);
    });
  });

  //http:localhost:5000/*
  describe("/not found routes", () => {
    test("test should return not found 404", async () => {
      await supertest(app).get(`/admin/`).expect(AdminErrorCodes.NOT_FOUND);
    });
  });
});
