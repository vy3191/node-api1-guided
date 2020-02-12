// const http = require('http');
const express = require("express");
const users = require("./users.js");

const server = express();

server.get("/", (req,res) => {
   res.json({message:"hello, world"});
});

server.get("/lambda", (req,res) => {
   res.redirect("https://lambdaschool.com");
});

server.get("/users", (req,res) => {
   res.json(users);
});

server.get("/users/:id", (req,res) => {
   const id = req.params.id;
   const user = users.find( u => u.id == id);
   if(user) {
     res.json(user);
   } else {
     res.status(404).json("Not found")
   }
});


// const server = http.createServer((req,res) => {
//      res.statusCode = 200;
//      // return some JSON to the client
//      res.setHeader("Content-Type", "application/json");
//      res.write(`{"message":"hello, world"}`);
//      // send the response off
//      res.end();
// });

server.listen(8080, ()=> {
   console.log("server started at http://localhost:8080");
})