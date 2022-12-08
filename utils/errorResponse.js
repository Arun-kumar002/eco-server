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