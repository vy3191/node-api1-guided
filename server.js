// const http = require('http');
const express = require("express");
let users = require("./users.js");

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
     res.status(404).json("Not found");
    }
  });
  
  server.post("/users", (req,res) => {
    const newUser = {
      id: users.length+1,
      name: "Bob Doe"
    }
    users.push(newUser);
    res.status(201).json(newUser);
  });
  
  server.delete("/users/:id", (req,res) => {
    const {id} = req.params;
    const user = users.find( u => u.id == id);
    if(user) {
      users.filter( u => u.id !=id)
      res.status(200).json(user);
    } else {
      res.status(404).json("Not found");
    }
  });
  
  server.put("/users/:id", (req,res) => {
     const index = users.findIndex( u => u.id == req.params.id); 
      console.log(req.body)    
      if(req.body.name) {
      users[index].name = req.body.name;
    } else {
      res.status(404).json("Not found");
    }
    res.status(200).json(users[index]);
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