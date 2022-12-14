let mocks = require("node-mocks-http");
const sinon = require("sinon");
const { connectDb } = require("../../config/db");
const userService = require("./services");
const userControllers = require("./controller");
const { UserErrorCodes } = require("./error/userErrors");
beforeAll(async () => {
  await connectDb();
});

/******************************************************************/

describe("[userService]: createUser", () => {
  test("it should call user createUser controller if the validation success", async () => {
    let req = mocks.createRequest({
      body: {
        userName: "arundex",
        password: "123456",
        mobile: "24832",
        role: "user",
        email: "arunkk@gmail.com",
      },
    });

    let res = mocks.createResponse({});
    userControllers.create = jest.fn();

    await userService.createUser(req, res);
    res.json({
      userName: "arundex",
      password: "123456",
      mobile: "24832",
      role: "user",
      email: "arunkk@gmail.com",
    });

    
    console.log("[user Service] create res",res);

    expect(res.json()).toBeCalled();
    expect(res.statusCode).toBe(200);
    expect(userControllers.create).toHaveBeenCalledTimes(1);
    expect(res._headers["content-type"]).toBe("application/json");
  });

  // test("it should fail to call controller for {email:required} validation failed", async () => {
  //   let req = mocks.createRequest({
  //     body: {
  //       userName: "arun",
  //       password: "123456",
  //       mobile: "24832",
  //       role: "user",
  //       email: undefined,
  //     },
  //   });

  //   let res = mocks.createResponse();
  //   userControllers.create = jest.fn();

  //   await userService.createUser(req, res);
  //   await res.json();

  //   expect(res._headers["content-type"]).toBe("application/json");
  //   expect(res.statusCode).toBe(UserErrorCodes.MANDATORY_FIELDS_ERROR);
  //   expect(userControllers.create).toHaveBeenCalledTimes(0);
  // });

  // test("it should fail to call controller for {userName:required} validation failed", async () => {

  //   let req = mocks.createRequest({
  //     body: {
  //       userName: undefined,
  //       email: "arun@gmail.com",
  //       password: "123456",
  //       mobile: "24832",
  //       role: "user",
  //     },
  //   });

  //   let res = mocks.createResponse();
  //   userControllers.create = jest.fn();

  //   await userService.createUser(req, res);
  //   await res.json();

  //   expect(res._headers["content-type"]).toBe("application/json");
  //   expect(res.statusCode).toBe(UserErrorCodes.MANDATORY_FIELDS_ERROR);
  //   expect(userControllers.create).toHaveBeenCalledTimes(0);

  // });
});

/******************************************************************/

// describe("[userService]: validate", () => {

//   test("it should call validateUser controller if the validation success ", async () => {

//     let req = mocks.createRequest({
//       body: {
//         email: "arunkk@gmail.com",
//         password: "123456",
//       },
//     });

//     let res = mocks.createResponse();
//     userControllers.validate = jest.fn();

//     await userService.validateUser(req, res);
//     await res.json();

//     expect(res._headers["content-type"]).toBe("application/json");
//     expect(res.statusCode).toBe(200);
//     expect(userControllers.validate).toHaveBeenCalledTimes(1);
//   });

//   test("it should fail to call controller for {email:required} validation failed", async () => {

//     let req = mocks.createRequest({
//       body: {
//         password: "12345",
//         email: undefined,
//       },
//     });

//     let res = mocks.createResponse();
//     userControllers.validate = jest.fn();

//     await userService.validateUser(req, res);
//     await res.json();

//     expect(res._headers["content-type"]).toBe("application/json");
//     expect(res.statusCode).toBe(UserErrorCodes.MANDATORY_FIELDS_ERROR);
//     expect(userControllers.validate).toHaveBeenCalledTimes(0);
//   });

//   test("it should fail to call controller for validation failed {password:requird}", async () => {

//     let req = mocks.createRequest({
//       body: {
//         email: "arun@gmail.com",
//         password: undefined,
//       },
//     });

//     let res = mocks.createResponse();
//     userControllers.validate = jest.fn();

//     await userService.validateUser(req, res);
//     await res.json();

//     expect(res._headers["content-type"]).toBe("application/json");
//     expect(res.statusCode).toBe(UserErrorCodes.MANDATORY_FIELDS_ERROR);
//     expect(userControllers.validate).toHaveBeenCalledTimes(0);
//   });
// });

// /******************************************************************/

// describe("[userService]: userUpdate", () => {
//   test("it should call userUpdate controller if the validation is success", async () => {
//     let req = mocks.createRequest({
//       params: {
//         id: "63986ff87e56130ef94496c6",
//       },
//       body: {
//         userName: "dexter",
//         password: "dexter",
//         mobile: "24832",
//         role: "user",
//         email: "dexter@gmail.com",
//       },
//     });

//     let res = mocks.createResponse();
//     userControllers.updateById = jest.fn();

//     await userService.userUpdate(req, res);
//     await res.json();

//     expect(res._headers["content-type"]).toBe("application/json");
//     expect(res.statusCode).toBe(200);
//     expect(userControllers.updateById).toHaveBeenCalledTimes(1);
//   });

//   test("it should return undefined if the validation failed", async () => {
//     let req = mocks.createRequest({
//       params: {
//         id: undefined,
//       },
//       body: {
//         userName: "dexter",
//         password: "dexter",
//         mobile: "24832",
//         role: "user",
//         email: "dexter@gmail.com",
//       },
//     });

//     let res = mocks.createResponse();
//     userControllers.updateById = jest.fn();

//     await userService.userUpdate(req, res);
//     await res.json();
//     expect(res._headers["content-type"]).toBe("application/json");
//     expect(res.statusCode).toBe(UserErrorCodes.MANDATORY_FIELDS_ERROR);
//     expect(userControllers.updateById).toHaveBeenCalledTimes(0);
//   });
// });

// /******************************************************************/

// describe("[userService]: getAllUsers", () => {
//   test("it should call getAll controller if the validation is success", async () => {
//     let req = mocks.createRequest({
//       query: {
//         skip: 0,
//         limit: 0,
//         getCount: true,
//       },
//     });

//     let res = mocks.createResponse();
//     userControllers.getAll = jest.fn();

//     await userService.getAllUsers(req, res);
//     await res.json();

//     expect(res._headers["content-type"]).toBe("application/json");
//     expect(res.statusCode).toBe(200);
//     expect(userControllers.getAll).toHaveBeenCalledTimes(1);
//   });

//   test("it should throw error {getCount:mandatory} validation failed", async () => {

//     let req = mocks.createRequest({
//       query: {
//         skip: 0,
//         limit: 0,
//         getCount:undefined
//       },
//     });

//     let res = mocks.createResponse();
//     userControllers.getAll = jest.fn();

//     await userService.getAllUsers(req, res);
//     await res.json();

//     expect(res._headers["content-type"]).toBe("application/json");
//     expect(res.statusCode).toBe(UserErrorCodes.MANDATORY_FIELDS_ERROR);
//     expect(userControllers.getAll).toHaveBeenCalledTimes(0);
//   });
// });

// /******************************************************************/

// describe("[userService] : getUser", () => {
//   test("it shoul call getUser controller if the validations for params is success", async () => {
//     let req = mocks.createRequest({
//       params: {
//         id: "63986ff87e56130ef94496c6",
//       },
//     });

//     let res = mocks.createResponse();
//     userControllers.getById = jest.fn();

//     await userService.getUser(req, res);
//     await res.json();

//     expect(res._headers["content-type"]).toBe("application/json");
//     expect(res.statusCode).toBe(200);
//     expect(userControllers.getById).toHaveBeenCalledTimes(1);
//   });

//   test("it return a error for {id:undefined} the validation fail ", async () => {
//     let req = mocks.createRequest({
//       params: {
//         id: undefined,
//       },
//     });
//     let res = mocks.createResponse();
//     userControllers.getById = jest.fn();

//     await userService.getUser(req, res);
//     await res.json();

//     expect(res._headers["content-type"]).toBe("application/json");
//     expect(res.statusCode).toBe(UserErrorCodes.MANDATORY_FIELDS_ERROR);
//     expect(userControllers.getById).toHaveBeenCalledTimes(0);
//   });
// });

// /******************************************************************/

// describe("[userService]: deleteUser", () => {
//   test("it should call the deleteUser controller if params validation is success {id:id}", async () => {
//     let req = mocks.createRequest({
//       params: {
//         id: "63986ff87e56130ef94496c6",
//       },
//     });
//     let res = mocks.createResponse();

//     userControllers.deleteById = jest.fn();

//     await userService.deleteUser(req, res);
//     await res.json();

//     expect(res._headers["content-type"]).toBe("application/json");
//     expect(res.statusCode).toBe(200);
//     expect(userControllers.deleteById).toHaveBeenCalledTimes(1);
//   });

//   test("it should throw error for {id: undefined} validation fail", async () => {
//     let req = mocks.createRequest({
//       params: {
//         id: undefined,
//       },
//     });
//     let res = mocks.createResponse();
//     userControllers.deleteById = jest.fn();

//     await userService.deleteUser(req, res);
//     await res.json();

//     expect(res._headers["content-type"]).toBe("application/json");
//     expect(res.statusCode).toBe(UserErrorCodes.MANDATORY_FIELDS_ERROR);
//     expect(userControllers.deleteById).toHaveBeenCalledTimes(0);
//   });
// });
