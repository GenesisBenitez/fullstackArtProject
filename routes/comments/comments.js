
const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const db = require("../../sql/dbConfig");


router.get("/getCommentsByPaintingId/:id", (request,response)=>{
    if(request.session.loggedin){
        db.query(
            `
            SELECT users.username, paintings.painting_name, comments.comment, comments.created_at
            FROM comments
            INNER JOIN users ON comments.user_id = users.id
            INNER JOIN paintings ON comments.painting_id = paintings.id
            WHERE painting_id = ?;
            `, [request.params.id], (err,results) =>{
                if(err) throw err;
                response.send(results);
            })
            }else{
                response.send({status: "User not authenticated"});
            }
    })
    router.post("/addComment", (request,response) =>{
        if(request.session.loggedin){
       db.query(
       `INSERT INTO comments(user_id, painting_id, comment)
       VALUES(?,?,?);

       `, [request.body.userId, request.body.paintingId, request.body.comment],(err,results) =>{
           if(err) throw err;
           response.send({status: "success"});
       })
    }else{
            response.statusCode = 401;
            response.send({status: "User not authenticated"})  
        }
   })


module.exports = router;