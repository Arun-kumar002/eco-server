const supertest = require("supertest");
const app = require("../server");

describe("user test", () => {
  let baseRoute = "user";
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
    it("it should return all user", async () => {
      await supertest(app)
        .get(`/${baseRoute}?limit=5&skip=1&getCount=true`)
        .expect(200);
    });
  });

  describe("/user get", () => {
    it("it should return 400 for missing query", async () => {
      await supertest(app).get(`/${baseRoute}?limit=0&skip=0`).expect(400);
    });
  });
  //TODO post requests
  //http://localhost:5000/user
  describe("/user post", () => {
    it("it should create a new user", async () => {
      await supertest(app).post(`/${baseRoute}/`).send(inputs).expect(200);
    });
  });

  describe("/user post", () => {
    it("it should return 400 user already present", async () => {
      await supertest(app).post(`/${baseRoute}/`).send(inputs).expect(400);
    });
  });
  //http://localhost:5000/user/login
  describe("/user login", () => {
    it("it should check a user is existing", async () => {
      await supertest(app)
        .post(`/${baseRoute}` + `/login`)
        .send({ email: inputs.email, password: inputs.password })
        .expect(200);
    });
  });

  describe("/user login", () => {
    it("it should check a user login with wrong credentials", async () => {
      await supertest(app)
        .post(`/${baseRoute}` + `/login`)
        .send({ email: inputs.email, password: "123455" })
        .expect(400);
    });
  });

  //TODO put request
  //http://localhost:5000/user/:id
  describe("/user update ", () => {
    it("it should updating a existing user", async () => {
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

  describe("/user update ", () => {
    it("it should return 400 for wrong id", async () => {
      let id = "6390723404412d860821ef6r";
      await supertest(app)
        .put(`/${baseRoute}` + `/${id}`)
        .send({ ...inputs })
        .expect(400);
    });
  });

  //TODO delete request
  //http://localhost:5000/user/6390725d04412d860821ef72
  describe("/user delete", () => {
    it("it should delete a existing user", async () => {
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

  describe("/user delete", () => {
    it("it should return 400 for id is wrong", async () => {
      await supertest(app)
        .delete(`/${baseRoute}/6390723404412d860821ef6r`)
        .expect(400);
    });
  });

  //http:localhost:5000/*
  describe("/not found routes", () => {
    it("it should return not found 404", async () => {
      await supertest(app).get(`/arun`).expect(404);
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
    it("it should create new admin user", async () => {
      await supertest(app)
        .post(`/auth/` + `${baseRoute}`)
        .send(admininputs)
        .expect(200);
    });
  });

  describe("/admin register", () => {
    it("it should return 400 for same admin mail id", async () => {
      await supertest(app)
        .post(`/auth/` + `${baseRoute}`)
        .send(admininputs)
        .expect(400);
    });
  });

  //http://localhost:5000/auth/admin/login
  describe("/admin login", () => {
    it("it should check a admin is existing", async () => {
      await supertest(app)
        .post(`/auth/` + `${baseRoute}` + `/login`)
        .send(admininputs)
        .expect(200);
    });
  });

  describe("/admin login", () => {
    it("it should check a admin is existing with wrong credentials", async () => {
      await supertest(app)
        .post(`/auth/` + `${baseRoute}` + `/login`)
        .send({
          email: admininputs.email,
          password: "admin13",
          role: admininputs.role,
        })
        .expect(400);
    });
  });
  //http://localhost:5000/auth/admin
  describe("/admin update", () => {
    it("it should update the existing admin user with the email", async () => {
      await supertest(app)
        .put(`/auth/` + `${baseRoute}`)
        .send({
          email: admininputs.email,
          password: "admin123",
          role: admininputs.role,
        })
        .expect(200);
    });
  });

  describe("/admin update", () => {
    it("it should  return update failed  with wrong email", async () => {
      await supertest(app)
        .put(`/auth/` + `${baseRoute}`)
        .send({
          email: "admin10000@gmail.com",
          password: "admin154",
          role: admininputs.role,
        })
        .expect(400);
    });
  });

  //http://localhost:5000/auth/admin?email=demo@gmail.com

  describe("/admin delete", () => {
    it("it should deleting a existing admin user", async () => {
      await supertest(app)
        .delete(`/auth/` + `${baseRoute}` + `?email=` + admininputs.email)
        .expect(200);
    });
  });

  describe("/admin delete", () => {
    it("it should return 400 without query mail id", async () => {
      await supertest(app)
        .delete(`/auth/` + `${baseRoute}` + `?email=`)
        .expect(400);
    });
  });

  //http:localhost:5000/*
  describe("/not found routes", () => {
    it("it should return not found 404", async () => {
      await supertest(app).get(`/admin/`).expect(404);
    });
  });
});
