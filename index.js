const express = require('express');
const bodyParser = require("body-parser");
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const homeRoute = require("./routes/home/home");
const loginRoute = require("./routes/login/loginRoute");
const paintingsRoute = require("./routes/paintings/paintings");
const artistsRoute = require("./routes/artists/artists");
const commentsRoute = require("./routes/comments/comments");
const res = require('express/lib/response');
const db = require('./sql/dbconfig');
const { response, request } = require('express');


const app = express();
const port = 3000;
app.use(cors());

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.use("/styles",express.static(__dirname + "/styles"));
app.use("/", homeRoute);
app.use("/", loginRoute);
app.use("/paintings", paintingsRoute);
app.use("/artists", artistsRoute);
app.use("/comments", commentsRoute);




app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
});