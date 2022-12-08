const supertest = require("supertest");
const app = require("../server");
//!user
describe("user", () => {
  let inputs = {
    username: "testing",
    email: "test@gmail.com",
    mobile: "45123784357",
    password: "test123",
    role: "user",
  };
  let baseRoute='user'
  describe("/user get", () => {
    it("it should return all user", async () => {
      await supertest(app).get(`/${baseRoute}?limit=5&pageno=1`).expect(200);
    });
  });

  describe("/user get", () => {
    it("it should return 400 for missing query string", async () => {
      await supertest(app).get(`/${baseRoute}?limit=5`).expect(400);
    });
  });

  describe("/user register", () => {
    it("it should create a user", async () => {
      await supertest(app)
        .post(`/${baseRoute}`)
        .send({ ...inputs })
        .expect(200);
    });
  });

  describe("/user login", () => {
    it("it should check  a user is existing", async () => {
      await supertest(app)
        .post(`/${baseRoute}`+`/login`)
        .send({ email: inputs.email, password: inputs.password })
        .expect(200);
    });
  });

  describe("/user login", () => {
    it("it should check  a user is existing with wrong credentials", async () => {
      await supertest(app)
        .post(`/${baseRoute}`+`/login`)
        .send({ email: inputs.email, password: "123456" })
        .expect(400);
    });
  });

  describe("/user update ", () => {
    it("it should updating a existing user", async () => {
      let getinguserid = await supertest(app)
        .post(`/${baseRoute}`+`/id`)
        .send({
          email: inputs.email,
        })
        .expect(200);
      let parse = JSON.parse(getinguserid.text);
      let id = parse.user;
      console.log("updateuser-id");
      await supertest(app)
        .put(`/${baseRoute}`+`/${id}`)
        .send({ ...inputs })
        .expect(200);
    });
  });

  describe("/user update ", () => {
    it("it should return 400 for wrong id", async () => {
      let id = "638dd089c3ccd3e147b9c73b";
      await supertest(app)
        .put(`/${baseRoute}`+`/${id}`)
        .send({ ...inputs })
        .expect(400);
    });
  });


  describe("/user setPassword", () => {
    it("it should update a existing user password", async () => {
      await supertest(app)
        .put(`/${baseRoute}`+`/setpassword`)
        .send({ email: inputs.email, password: "123456" })
        .expect(200);
    });
  });

  describe("/user setPassword", () => {
    it("it should return 400 for 2nd time update", async () => {
      await supertest(app)
        .put(`/${baseRoute}`+`/setpassword`)
        .send({ email: inputs.email, password: "123456" })
        .expect(400);
    });
  });


  describe("/user delete", () => {
    it("it should delete a existing user", async () => {
      let getinguserid = await supertest(app)
        .post(`/${baseRoute}`+`/id`)
        .send({
          email: inputs.email,
        })
        .expect(200);
      let parse = JSON.parse(getinguserid.text);
      let id = parse.user;

      await supertest(app).delete(`/${baseRoute}`+`/${id}`).expect(200);
    });
  });

  describe("/user delete", () => {
    it("it should return 400 for id is wrong", async () => {
      let id = "63888114b703db1d5e662523";
      await supertest(app).delete(`/${baseRoute}`+`/${id}`).expect(400);
    });
  });

  

  describe("/not found routes", () => {
    it("it should return not found 404", async () => {
      await supertest(app).get(`/arun`).expect(404);
    });
  });
});

//!admin
describe("admin", () => {
  let admininputs = {
    email: "admin005@gmail.com",
    password: "admin123",
    role: "admin",
  };
  let baseRoute='admin'

  describe("/admin register", () => {
    it("it should create new admin user", async () => {
      await supertest(app)
        .post(`/auth/`+`${baseRoute}`)
        .send({ ...admininputs })
        .expect(200);
    });
  });

  describe("/admin login", () => {
    it("it should check a admin is existing", async () => {
      await supertest(app)
        .post(`/auth/`+`${baseRoute}`+`/login`)
        .send({ ...admininputs })
        .expect(200);
    });
  });

  describe("/admin login", () => {
    it("it should check a admin is existing with wrong credentials", async () => {
      await supertest(app)
        .post(`/auth/`+`${baseRoute}`+`/login`)
        .send({
          email: "admin001@gmail.com",
          password: "admin13",
          role: "admin",
        })
        .expect(400);
    });
  });

  describe("/admin register", () => {
    it("it should return 400 for same admin mail id", async () => {
      await supertest(app)
        .post(`/auth/`+`${baseRoute}`)
        .send({ ...admininputs })
        .expect(400);
    });
  });

  describe("/admin delete", () => {
    it("it should deleting a existing admin user", async () => {
      await supertest(app)
        .delete(`/auth/`+`${baseRoute}`+`?email=`+ admininputs.email)
        .expect(200);
    });
  });

  describe("/not found routes", () => {
    it("it should return not found 404", async () => {
      await supertest(app).get(`/admin/`).expect(404);
    });
  });
});
