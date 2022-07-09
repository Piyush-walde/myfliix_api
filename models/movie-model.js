const mongoose=require('mongoose');



//schema for movies collections
const movieSchema=mongoose.Schema({
    
    name:{
        type:String,
        require:true,
    },
    
    releaseDate:{
        type:Date,
        require:true,
    },

    runtime:{
        type:Number,
        require:true,
    },

    genere:{
        type:String,
        require:true,
    },

    description:{
        type:String,
        require:true,
        minlength:50,
        maxlength:200,
    },

    imdbRating:{
        type:Number,
        min:1,
        max:10,
        require:true,
    },

    posterURL:{
        type:String,
        require:true,
        unique:true,
    },
    
    filePath:{
        type:String,
        require:true,
        unique:true
    },

    top:{
        type:Boolean,
        default:false
    },

    watchers:{
        type:Number,
        default:0
    }

},{timestamps:true})

// movies collection follows the movieSchema schema and gives all the function to use on collecion 
const movieModel=mongoose.model("movies",movieSchema);

module.exports=movieModel;