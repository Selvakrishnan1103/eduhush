import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI
if(!MONGO_URI){
    throw new Error("Please Check the MONGO_URI")
}

let cached = global.mongoose || { conn : null , promise : null}

export async function connectToMongoDb(){
    if(cached.conn) return cached.conn
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGO_URI)
    }
    cached.conn = await cached.promise
    return cached.conn
}