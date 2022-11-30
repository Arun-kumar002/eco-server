const authmodal = require("../Modal/AuthModal");
const registerController = async (req, res, next) => {
  try {
    let user = await authmodal.create(req.body);
    res.status(200).json({ message: "user registered successfully...", user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerController };
