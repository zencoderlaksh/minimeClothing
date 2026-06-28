import mongoose from "mongoose";

const connect_db = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.db_name}`)
        console.log("MongoDb connected successfully !!");
        
    } catch (error) {
        console.log("Mongo error : ",error)
        process.exit(1);
    }
}
export default connect_db;