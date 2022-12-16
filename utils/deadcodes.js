//!if it throw an error any one see my credentials and guess the next thing we cant able to express validators
// const UpdateUserPassword = async ({ email, password }) => {
//     if (checked.useredit === false)
//       throw new UserError(400, "you can't update the password");

//     let user = await updatingExistingUserByEmail({
//       email,
//       password,
//       useredit: false,
//     });
//     return user;
//   };
//!violating slap principles & accidental complexity
// let setPassword = async (req, res) => {
//     try {
//       let errorMessage = await validationService(req);
//       if (errorMessage) {
//         res.status(400).json({ status: "error", message: errorMessage });
//         return;
//       }
//       let { password, email } = req.body;
//       let user = await userControllers.setPassword({
//         email,
//         password,
//       });

//      res.status(200).json({user,message:''})

//     } catch (error) {
//       console.log(`[${tag}] setPassword:`, error);
//       res.status(error.statuscode).json({ message: error.message, status: "error" });
//     }
//   };

//url=http://localhost:5000/user/setpassword
// routes.put(`/${baseRoute}/setpassword`,validationSchema.loginSchema, userService.setPassword);

//!premature optimization
// test("it should check the users are skipped", async () => {
//     let checklimit = 5;
//     expect(userControllers.getAll).toBeInstanceOf(Function);
//     expect(userControllers.create).toBeInstanceOf(Function);

//     for (let i = 0; i < 20; i++) {
//       const createUser = generateRandomUser();
//       let user = await userControllers.create(createUser);
//       expect(user).toBeDefined();
//     }

//     let resultWithoutSkipAndLimit = await userControllers.getAll({
//       skip: 0,
//       limit: 0,
//       getCount: true,
//     });
//     expect(resultWithoutSkipAndLimit).toBeDefined();

//     expect(resultWithoutSkipAndLimit.count).toBe(
//       resultWithoutSkipAndLimit.users.length
//     );

//     let skipcount = Math.ceil(resultWithoutSkipAndLimit.count / 5);

//     console.log("skipcount", skipcount, resultWithoutSkipAndLimit.users.length);

//     let params = {
//       skip: 1,
//       limit: 5,
//       getCount: true,
//     };

//     for (let i = 1; i < skipcount+1; i++) {
//       let result = await userControllers.getAll({
//         skip: params.skip,
//         limit: params.limit,
//         getCount: params.getCount,
//       });
//       params.skip = params.skip + 1;
//       if (i==skipcount) {
//         console.log(i,result.users.length);
//         expect(result.users.length !=checklimit).toBe(true);

//       }
//     }
//!validator using request its so costlier
//  ///ids
// custom: {
//     options: (value, { req }) => {
//       let isValid = mongoose.Types.ObjectId.isValid(value);
//       if (!isValid) {
//         throw new Error("user id invalid");
//       }
//       return true;
//     },
//   },
// },

//!accidental complixity

// if (
// /**/  !Object.keys(params)[0] === true ||
//   Object.values(params).includes(undefined)
// ) {
//   throw new userErrors.MandatoryFieldsError();
// }
//!schema methods violating solid peinciple
// AdminSchmema.pre("save", async function () {
//   this.password = CryptoJS.AES.encrypt(this.password, PASSWORD_SECRET).toString();
// });

// AdminSchmema.methods.matchPassword = async function (enteredPassword) {

//   let password=await CryptoJS.AES.decrypt(this.password, PASSWORD_SECRET).toString(
//     CryptoJS.enc.Utf8
//   );
//   return enteredPassword==password
// };

//!convert custom fun to error instance now its controllable
//const validationService = async (params, schema) => {
//server side validation
//   const { error } = await schema.validate(params);
//   if (error) {
//     const firstError = error.details[0];
//     return { [firstError.type]: firstError.message };
//   }
//   return false;
// };

//!express validator is not good for our application because it takes request for validation and if any
//!any field is not satisfied also it process whole request
// const validationService = async (params, schema) => {
//   if (
// /    !Object.keys(params)[0] === true ||
//     Object.values(params).includes(undefined)
//   ) {
//     throw new userErrors.MandatoryFieldsError();
//   }

//   //server side validation
//   const { error, values } = await schema.validate(params);

//   if (error) {
//     const firstError = error.details[0];
//     return { [firstError.type]: firstError.message };
//   }
//   return false;
// };

//!userService getById we can't test because we need mongoId if we give random id it will rejected by our 
//!mongo validtor MongoIdIsvalid fun
// test("it shoul call getUser controller if the validations for params is success", async () => {
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