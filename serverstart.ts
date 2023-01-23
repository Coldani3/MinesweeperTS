var http = require("http");
var fs = require("fs");
var express = require("express");
var path = require("path");

var app = express();

function bindFileToApp(app, fileName, routeName = fileName)
{
    app.get("/" + routeName, (req, res) => {
        res.sendFile(path.join(__dirname + "/" + fileName));
    })
}


bindFileToApp(app, "index.html", "");
bindFileToApp(app, "minesweeper.css");
bindFileToApp(app, "bomb.png");
bindFileToApp(app, "flag.png");
//bindFileToApp(app, "src/Main.js");
app.use(express.static("public"));

app.listen(/*process.env || */8080, () => console.log('App availible on http://localhost:8080'));


// fs.readFile("index.html", (err, html) => {
//     if (err)
//     {
//         throw err;
//     }

//     http.createServer((request, response) => {
//         response.writeHead(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(8080);
// });