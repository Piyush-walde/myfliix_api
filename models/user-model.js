const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
  
    name:{
        type:String,
        required:true,
        minlength:3
    },

    username:{
         type:String,
         required:true,
         unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true,

    },

    contact:{
        type:Number,
        required:true,
        minLength:10,
        maxLength:10
    },
    
    city:{
        type:String,
    }

},{timestamps:true})


const userModel=mongoose.model("users",userSchema);

module.exports=userModel;