module.exports = {
  ensureauthenticated: (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(400).json({ message: "your not a authenticated person..." });
    }
  },
};
