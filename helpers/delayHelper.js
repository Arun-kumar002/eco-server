const { stat } = require("fs");
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const checkFileCreated = (path, tries, interval) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    const timer = setInterval(() => {
      count = count + 1;
      stat(path, (err, stats) => {
        if (err == null || !err) {
          resolve(true);
          console.log("file found");
          clearInterval(timer);
          return;
        }
      });
      if (count == tries) {
        clearInterval(timer);
        reject(new Error("Invoice file could not be found"));
      }
    }, interval);
  });
};
console.log(
  checkFileCreated(
    "/home/local/BSILIND/arunkumar.s/nodejs/connect/angular7_tutorial.pdf",
    2,
    8000
  )
);
module.exports = { delay, checkFileCreated };
