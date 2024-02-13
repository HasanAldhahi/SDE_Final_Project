import express from "express"

import * as dotenv from 'dotenv'
import {v2 as cloudinary } from 'cloudinary';
import PostSchema from '../mongodb/models/post.js'
dotenv.config()
const router = express.Router()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
//GET ALL POSTS fetch them form the database 
router.route('/').get(async (req, res) => {
    try {
        console.log("GET REQUEST IS HERE")
        const posts = await PostSchema.find({})
        console.log("posts", posts)
        res.status(200).json({success:true, data: posts})
    } catch (error) {
        res.status(500).json({success:false, message: error})
    }

})
//Create the posts 
router.route('/').post(async (req, res) => {
    try {

    const {name, prompt, dataList} = req.body
    console.log("POST REQUST IS HERE")
    console.log("this is what we recieved from the front end ",dataList )
    
    // const photoUrl = await cloudinary.uploader.upload(photo)

    //the database layer 
    const newPost = await PostSchema.create(req.body);
    const savedPost = await newPost.save();

    console.log("savedPost", savedPost)
    res.status(201).json({success: true , dataset : savedPost})
    }
    
    catch(err) {
        console.log("database mongo base error")
        res.status(500).json({success: false, message: err})
    }
 
}) 
export default router