const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../../sql/dbConfig");

//render methods

router.get("/", (request,response)=>{
    if(request.session.loggedin){
        response.render("paintings/paintingsHome", { username: request.session.username})
     }else{
        response.render('login');
         }
})


//render routes for ejs
router.get("/getPaintingView/:id", (request,response) =>{
    if(request.session.loggedin){
   db.query(`
   SELECT paintings.id, paintings.painting_name, paintings.img, paintings.description, painters.id AS painter_id, painters.first_name, painters.last_name
   FROM paintings
   INNER JOIN painters ON paintings.painter_id = painters.id where paintings.id = ?;`, [request.params.id],(err,results) =>{
       if(err) throw error;
       console.log(results);
       response.render("paintings/getPainting", { username: request.session.username, userId:request
        .session.userId, data: results[0]})
   })
}else{
        response.render('login'); 
    }
})

//api routes
router.get("/getAllPaintings", (request,response) =>{
     if(request.session.loggedin){
    db.query(`
    SELECT paintings.id, paintings.painting_name, paintings.img, paintings.description, painters.first_name, painters.last_name
    FROM paintings
    INNER JOIN painters ON paintings.painter_id = painters.id;`,(err,results) =>{
        if(err) throw error;
        response.send(results);
    })
 }else{
         response.statusCode = 401;
         response.send({status: "User not authenticated"})  
     }
})

router.get("/getPainting/:id", (request,response) =>{
     if(request.session.loggedin){
    db.query("select * from paintings where id = ?", [request.params.id],(err,results) =>{
        if(err) throw error;
        response.statusCode = 200;
        response.send(results);
    })
 }else{
         response.statusCode = 401;
         response.send({status: "User not authenticated"})  
     }
})


router.post("/addPainting", (request,response) =>{
     if(request.session.loggedin){
    db.query(
    "insert into paintings(painting_name,painter_id, description, img) values(?,?,?,?)", [request.body.paintingName, request.body.painterId, request.body.description, request.body.img],(err,results) =>{
        if(err) throw error;
        response.send({status: "success"});
    })
 }else{
         response.statusCode = 401;
         response.send({status: "User not authenticated"})  
     }
})

router.put("/updatepainting/:id", (request,response) =>{
     if(request.session.loggedin){
    db.query(
    "update paintings set painting_name = ? ,painter_id = ?, description=?, img=? where id = ?", [request.body.paintingName, request.body.painterId, request.body.description, request.body.img, request.params.id],(err,results) =>{
        if(err) throw error;
        response.send({status: "success"})
    })
 }else{
         response.statusCode = 401;
         response.send({status: "User not authenticated"})  
     }
})

router.delete("/deletepainting/:id", (request,response) =>{
     if(request.session.loggedin){
    db.query(
    "delete from paintings where id = ?", [request.params.id],(err,results) =>{
        if(err) throw error;
        response.statusCode = 200;
        response.send({status: "success"});
    })
 }else{
         response.statusCode = 401;
         response.send({status: "User not authenticated"})  
     }
})

module.exports = router;