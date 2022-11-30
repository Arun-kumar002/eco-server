const wkhtmltopdf=require('wkhtmltopdf')

let generatePdf=()=>{
    wkhtmltopdf("<h1>Test</h1><p>Hello world</p>", {
      output: "sample.pdf",
      ignore: ["QFont::setPixelSize: Pixel size <= 0 (0)"],
    });
}
module.exports={generatePdf}