import mongoose from "mongoose"

const Post = new mongoose.Schema({
    name: {type: string, required: true},
    prompt: {type:sting, required:true  },
    photo: {type:string, required:true},
})

const PostSchema = mongoose.model('Post', Post)

export default PostSchema;