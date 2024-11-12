import mongoose from "mongoose";


const userModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
         type:String,
         unique: true,
         required: true,
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
 role:{
        type:String,
        enum:['user', 'agent', 'admin'],
        default:'user'
    },
    created_At:{
        type:Date,
        default:Date.now()
    }
}
)

export default mongoose.model('user',userModel)






