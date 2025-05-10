import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email : { type : String , unique: true, required : true},
    firstName : {type : String},
    lastName : {type : String},
    profilePicture : { type : String},
    bio : {type : String},
    isAdmin: { type: Boolean, default: false }
})

const User = mongoose.models.User || mongoose.model("User",UserSchema)
export default User