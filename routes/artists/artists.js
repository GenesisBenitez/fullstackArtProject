
const express = require('express');
const router = express.Router();
const db = require("../../sql/dbConfig");

router.get("/", (request,response)=>{
    if(request.session.loggedin){
        response.render("artists/artistsHome", { username: request.session.username})
     }else{
        response.render('login');
         }
})


router.get("/getArtistView/:id", (request,response) =>{
    if(request.session.loggedin){
   db.query(`SELECT * from painters where id = ?`, [request.params.id],(err,results) =>{
       if(err) throw error;
       response.render("artists/getArtist", { username: request.session.username, userId:request
        .session.userId, data: results[0]})
   })
}else{
        response.render('login'); 
    }
})

router.get("/getAllArtists", (request,response) =>{
    if(request.session.loggedin){
   db.query("select * from painters",(err,results) =>{
       if(err) throw error;
       response.send(results);
   })
}else{
        response.statusCode = 401;
        response.send({status: "User not authenticated"})  
    }
})


router.get("/getArtist/:id", (request,response) =>{
     if(request.session.loggedin){
    db.query("select * from painters where id = ?", [request.params.id],(err,results) =>{
        if(err) throw error;
        response.statusCode = 200;
        response.send(results);
    })
 }else{
         response.statusCode = 401;
         response.send({status: "User not authenticated"})  
     }
})

router.post("/addArtist", (request,response) =>{
     if(request.session.loggedin){
    db.query(
    "insert into painters(first_name,last_name, art_movement, bio, img) values(?,?,?,?,?)", [request.body.firstName, request.body.lastName, request.body.artMovement, request.body.bio, request.body.img],(err,results) =>{
        if(err) throw error;
        response.send({status: "success"});
    })
 }else{
         response.statusCode = 401;
         response.send({status: "User not authenticated"})  
     }
})

router.put("/updateArtist/:id", (request,response) =>{
     if(request.session.loggedin){
    db.query(
    "update painters set first_name = ? ,last_name = ?, art_movement=?, bio=?, img = ? where id = ?", [request.body.firstName, request.body.lastName, request.body.artMovement, request.body.bio, request.body.img, request.params.id],(err,results) =>{
        if(err) throw error;
        response.send({status: "success"})
    })
 }else{
         response.statusCode = 401;
         response.send({status: "User not authenticated"})  
     }
})


router.get("/getAllDetailsByArtistId/:id", (request,response)=>{
    if(request.session.loggedin){
        db.query(
            `
            Select users.username, paintings.painting_name, painters.first_name, painters.last_name, comments.comment, comments.created_at
            from comments 
            inner join users on comments.user_id = users.id
            inner join paintings on comments.painting_id = paintings.id
            inner join painters on paintings.painter_id = painters.id
            where painter_id = ?;
            `, [request.params.id], (err, results)=>{
                if(err) throw err;
                response.send(results);
            }
        )
    }else{
        response.statusCode = 401;
        response.send({status: "User not authenticated"}) 
    }
})
// router.delete("/deleteArtist/:id", (request,response) =>{
//      if(request.session.loggedin){
//     db.query(
//     "delete from paintings where id = ?", [request.params.id],(err,results) =>{
//         if(err) throw error;
//         response.statusCode = 200;
//         response.send({status: "success"});
//     })
//  }else{
//          response.statusCode = 401;
//          response.send({status: "User not authenticated"})  
//      }
// })


module.exports = router;
