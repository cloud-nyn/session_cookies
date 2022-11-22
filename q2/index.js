const express = require("express");

const path = require("path");
const serverApp = express();

const bodyParser = require("body-parser");
serverApp.use(bodyParser.urlencoded({ extended: true }));

serverApp.use("/css", express.static(path.join(__dirname, "css"))); //alias

serverApp.get("/", (req, res) => {
  const date = new Date();
  const hour = date.getHours();
  const style = hour >= 6 && hour < 18 ? "day" : "night";
  res.send(
    `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Question 4</title>
    <link href="/css/${style}.css" rel="stylesheet" />
  </head>
  <body>
  <form action="/result" method="post" > 
    <label>Name </label><input type="text" name="name"> 
    <label> age </label> <input type="text" name="age"> 
    <button type="submit">Submit query</button> 
    </form>
  </body>
</html>`
  );
});

serverApp.get(`/output`, (req, res) => {
  let name = req.query.name;
  let age = req.query.age;
  res.send(`Welcome ${name} whose age is ${age}`);
});

serverApp.post("/result", (req, res) => {
  const { name, age } = req.body; // => {'alazar' , 14}

  res.redirect(303, `/output?name=${name}&age=${age}`);
});

serverApp.listen(81, () => {
  console.log("Server running on port 81.");
});
