const mongoose=require('mongoose');


const userMovieSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"movies"
    },
    watchtime:{
        type:Number,
        default:0
    }
},{timestamps:true})


const userMovieModel=mongoose.model("user_movies",userMovieSchema);

module.exports=userMovieModel;