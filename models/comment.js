const {comment,model} = require("mongoose");

const commentSchema = new Schema({
    content:{
        type:String,
        required:ture,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        red:"user"
    }
})