const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const process=require('process');
const PORT= process.env.PORT || 8000;

const movieRouter=require("./routes/movie");
const userRouter=require("./routes/user");

// Header()
// header.Add("Access-Control-Allow-Origin", "*")
// header.Add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
// header.Add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

// $ git init
// // $ heroku git:remote -a myflix-apibypiyush
// $ git add .
// $ git commit -am "make it better"
// $ git push heroku master

// git config core.autocrlf true

//express object
const app=express();

app.use(express.json());
app.use(cors());

// Connect to the mongo server
// mongoose.connect("mongodb+srv://pwalde:PiyushWalde@cluster0.z6uso.mongodb.net/batch_8_movies_p")
mongoose.connect("mongodb+srv://pwalde:PiyushWalde@cluster0.z6uso.mongodb.net/batch_8_movies_p", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("connection to mongo successful");
})
app.get('/', (req, res) => {
    res.send('<h1>API for MovieFlix</h1>');
});

// if any request come /movies please tranfer it to movieRouter
app.use("/movies",movieRouter);
//if any request come for /users please tranfer it to userRouter
app.use("/users",userRouter);



app.listen(PORT,()=>{
    console.log("server is up and running");
})