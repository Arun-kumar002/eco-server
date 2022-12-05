const supertest = require("supertest");
const app = require("../server");
describe("user", () => {
  describe("/user get", () => {
    it("it should return all user", async () => {
      await supertest(app).get("/user?limit=5&pageno=2").expect(200);
    });
  });
  describe("/user post", () => {
    it("it should create a user", async () => {
      await supertest(app)
        .post("/user")
        .send({
          username: "logu",
          email: "logu@gmail.com",
          mobile: "45123784357",
          password: "1233445",
          role: "user",
        })
        .expect(200);
    });
  });
  describe("/user put", () => {
    it("it should update a existing user", async () => {
      let id = "63898665e6e76f8d54291e45";
      await supertest(app)
        .put(`/user/${id}`)
        .send({
          username: "pavankumar",
          email: "pavankumar@gmail.com",
          mobile: "45123784357",
          password: "1233445",
          role: "user",
        })
        .expect(200);
    });
  });
  describe("/user delete", () => {
    it("it should delete a existing user", async () => {
      let id = "63898646e6e76f8d54291e3f";
      await supertest(app).delete(`/user/${id}`).expect(200);
    });
  });
  describe("/not found routes", () => {
    it("it should return not found 404", async () => {
      await supertest(app).get(`/arun`).expect(404);
    });
  });
});
