import mongoose from "mongoose";

 const dbConnect = async(req,res)=>{
    try {

        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`db connected ${connect.connection.host}`)
        
    } catch (error) {

        console.log(error.message)
        
    }
}

export default dbConnect

