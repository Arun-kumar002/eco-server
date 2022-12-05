const getnotfound = (req, res) => {
  res.status(404).json({ message: "please check your route" });
};
const postnotfound = (req, res) => {
  res.status(404).json({ message: "please check your route" });
};
const putnotfound = (req, res) => {
  res.status(404).json({ message: "please check your route" });
};
const deletenotfound = (req, res) => {
  res.status(404).json({ message: "please check your route" });
};

module.exports = { deletenotfound, getnotfound, postnotfound, putnotfound };
