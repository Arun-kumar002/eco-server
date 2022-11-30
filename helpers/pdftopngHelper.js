let pdftopng = () => {
  try {
    require("pdf-to-png")({
      input: "public/uploads/1668506681860angular7_tutorial.pdf",
      output: "goat.png",
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { pdftopng };
