const {Schema,model}=require('mongoose')

const UserSchema=new Schema({
    username:{
        type:String
    },
    password:{
        type:String
    }
},{timestamps:true})

module.exports=model('auth',UserSchema)