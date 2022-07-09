const express=require('express');
const fs=require('fs');

const movieModel=require("../models/movie-model");
const verifyToken=require("../verify-token");

const router=express.Router();



// api to post movie  
router.post("/",verifyToken,(req,res)=>{

    movieModel.create(req.body)    //it returns a promises
    .then((doc)=>{
        res.send({message:"Movie created successfully"});
        
    })
    .catch((err)=>{
        res.send({message:"Some error while creating the movie"})
        console.log(err);
    })
})


//api to fetch all movies 

router.get("/",verifyToken,(req,res)=>{

    movieModel.find()
    .then((movies)=>{
        res.send(movies);
        // console.log(movies);
    })
    .catch((err)=>{
        res.send(err);
        res.send({message:"some error while fetching the movies "});
    })
})


/// api to fetch a single movie 

router.get("/:id",verifyToken,(req,res)=>{

    let movieId=req.params.id;
    movieModel.findOne({_id:movieId})
    .then((movie)=>{
        res.send(movie);
    })
    .catch((err)=>{
    res.send({message:"Some error"});
    console.log(err);
   
    })

})


let movie_id=null;
let filePath=null;


// endpoint for the video streaming 
router.get("/stream/:id",async(req,res)=>{

    if(movie_id===null || movie_id!==req.params.id){

        movie_id=req.params.id;

        let movie=await movieModel.findOne({_id:movie_id});
        // let filePath=null;
    
        if(movie!==null){
          filePath=movie.filePath;
        }

    }
    
    console.log(filePath);


    const range=req.headers.range;  //gives the range header 
    if(!range){
        res.send({message:"Range header is required"});
  
    }
  
   const videoSize=fs.statSync("./"+filePath).size; //gives the size of the video
  
    const start=Number(range.replace(/\D/g,"")); //extract the number from   range -0- e
  
    const end=Math.min(start+10**6,videoSize-1);  // 
  
    const contentLength=end-start;   /// length of the video that were display at a time 
  
    res.writeHead(206,{
        "Content-Range":`bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges":"bytes",
        "Content-Length":contentLength,
        "Content-Type":"video/mp4"
    })
  
    const readStream=fs.createReadStream("./"+filePath,{start,end}); //readable stream created 
  
    readStream.pipe(res);  //writring from readstream 
  
  
  
  })

module.exports=router;
