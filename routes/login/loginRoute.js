const express = require('express');
const router = express.Router();
const db = require("../../sql/dbConfig");

//login
router.post("/login", (request,response) => {
    let username = request.body.username;
    let password = request.body.password;

    if(username && password){
        db.query("select * from users where username = ? AND password = ?", [username,password], (error,results,fields) => {
            if(error) throw error;
            if(results.length > 0){
                request.session.loggedin = true;
                request.session.username = username;
                request.session.userId = results[0].id;
                response.redirect('/')
                // response.statusCode = 200;
                // response.send({status: "User successfully authenticated"})
            }else{
                response.statusCode = 401;
                response.send({status: "User not authenticated"})
            }
        })
    }
})
router.get("/createaccount", (request,response)=>{
    response.render("createaccount");
})

router.post("/addUser", (request,response) => {
    let username = request.body.username;
    let password = request.body.password;

    if(username && password){
        db.query("insert into users(username, password) values (?,?)", [username,password], (error,results,fields) => {
            if(error) throw error;
                response.redirect('/');
                // response.statusCode = 200;
                // response.send({status: "User successfully authenticated"})
        
        })
    }
})

router.get("/logout", (request,response)=>{
    request.session.loggedin = false;
    response.send({status: request.session.loggedin});
})
module.exports = router;