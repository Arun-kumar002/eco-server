class errorResponse extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode = statuscode
    }
}
module.exports = errorResponse


// const UpdateUserPassword = async ({ email, password }) => {
//     let checked = await getUserByEmail(email);
//     if (checked === null) throw new UserError(404, "user not found ");
  
//     if (checked.useredit === false)
//       throw new UserError(400, "you can't update the password");
  
//     let user = await updatingExistingUserByEmail({
//       email,
//       password,
//       useredit: false,
//     });
//     return user;
//   };
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
//   });