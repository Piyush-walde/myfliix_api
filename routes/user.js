const express=require('express');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const verifyToken=require("../verify-token");

const userModel=require("../models/user-model");

const userMovieModel=require("../models/user-movie-model");

const router=express.Router();


//endpoints go here

router.post("/",(req,res)=>{
    
    let user=req.body;
    console.log(user);
    bcryptjs.genSalt(10,(err,salt)=>{

      if(err===null || err===undefined)
      {
        
        bcryptjs.hash(user.password,salt,(err,encpry)=>{
          
            if(err===null || err===undefined)
            {
              user.password=encpry;

              userModel.create(user)
              .then((doc)=>{
                  res.send({message:"User registered"})
              })
              .catch((err)=>{
                  console.log(err);   //for developer
                  res.send({message:"Some problem while creating user "})
              })

            }
        })

      } 

    })
  
})


//

router.post("/login",(req,res)=>{
 
    let userCred=req.body;
   
    userModel.findOne({username:userCred.username})
    .then((user)=>{

      if(user!==null || user!==undefined)
      {
   
        bcryptjs.compare(userCred.password,user.password,(err,result)=>{
     
            if(err===null || err===undefined){

                if(result===true){
                    
                  //generate the token 
                  jwt.sign({username:userCred.username},"secretekey",(err,token)=>{

                    if(err==null || err===undefined)
                    {
                      res.send({success:true,token:token,username:user.username,user_id:user._id});
                    }

                  })
     

                  
                }
                else{
                    res.send({message:"Wrong password"});
                }
            }

        })

  
      }
      else
      {
        res.send({message:"user doesnt exist"});
      }

    })

    .catch((err)=>{
       console.log(err);
       res.send({message:"Some error while login"});
    })


})


router.post("/play",(req,res)=>{
  
  let user_movie=req.body;

  userMovieModel.findOne({movie:user_movie.movie,user:user_movie.user})
  .then((watchData)=>{

      if(watchData===null)
      {

        userMovieModel.create(user_movie)
        .then((doc)=>{
          res.send({respose:true,message:"Play Info Created",user_movie:doc});
        })
        .catch((err)=>{
          console.log(err);
          res.send({success:false,message:"some error while creating  "})
        })
    
        
      }  
      else{
        res.send({respose:true,message:"Play Info Exits",user_movie:watchData});
      }
  })
  .catch((err)=>{
    console.log(err);
    res.send({success:false,message:"can't play movie right now try again later"})
  })


})


router.put("/closeplayer/user_movie_id",verifyToken,(req,res)=>{

  let user_movie_id=req.params.user_movie_id;
  let dataToUpdate=req.body;

  userMovieModel.updateOne({_id:user_movie_id},dataToUpdate)
  .then((msg)=>{
    res.send({success:true,message:"Watch time updated successfully"})


  })
  .catch((err)=>{
    console.log(err);
    res.send({success:false,message:"Some problem while closing the player"});
  })



})






module.exports=router;
