const imgtoword = require("tesseract.js");

const imgToWordConverter = async (path, language) => {
  let word = await imgtoword.recognize(path, language); //3rd arg {logger:e=>log(e)}
  console.log(word.data.text);
};
imgToWordConverter('./para.png','eng')
//function has 2 args [1.path,2.language]