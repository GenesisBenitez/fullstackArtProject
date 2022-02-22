const express = require('express');
const router = express.Router();
const db = require("../../sql/dbConfig");

router.get("/", (request,response) =>{
    if(request.session.loggedin){
        response.render('index',
        {username: request.session.username});
    }else{
        response.render('login');
    }
   
})

module.exports = router;