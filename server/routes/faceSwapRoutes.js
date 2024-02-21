import express from "express"
import { client } from "@gradio/client";
import * as dotenv from 'dotenv'
import PostSchema from '../mongodb/models/post.js'
dotenv.config()
const router = express.Router()

//GET All the Output of the model fetch them form the database 
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



//Post Request the source image and the target image 
router.route('/').post(async (req, res) => {
    try {

    const {target, source} = req.body

    console.log("POST REQUST IS HERE")
    console.log("this is target, source from the front end ",target, source)

    // const sourceImage = await source.blob();
    // const targetImage = await target_0.blob();

    console.log(1)

    console.log(target)

    console.log(2)
    console.log(source)






    					
    const app = await client("https://felixrosberg-face-swap.hf.space/--replicas/cjapv/");
    const result = await app.predict("/run_inference", [
				targetImage, 	// blob in 'Target' Image component
				sourceImage, 	// blob in 'Source' Image component		
				0, // number (numeric value between 0 and 100) in 'Anonymization ratio (%)' Slider component		
				0, // number (numeric value between 0 and 100) in 'Adversarial defense ratio (%)' Slider component		
				["Compare"], // undefined  in 'Mode' Checkboxgroup component
	]);

    
    // const photoUrl = await cloudinary.uploader.upload(photo)

    //the database layer 
    const newPost = await PostSchema.create(result.data);
    const output = await newPost.save();

    // console.log("savedPost", savedPost)
    res.status(201).json({success: true, data: output })
    }
    
    catch(err) {
        console.log("database mongo base error")
        res.status(500).json({success: false, message: err})
    }
 
}) 
export default router



const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
const exampleImage = await response_0.blob();
						
// const app = await client("https://felixrosberg-face-swap.hf.space/--replicas/cjapv/");
// const result = await app.predict("/run_inference", [
// 				exampleImage, 	// blob in 'Target' Image component
// 				exampleImage, 	// blob in 'Source' Image component		
// 				0, // number (numeric value between 0 and 100) in 'Anonymization ratio (%)' Slider component		
// 				0, // number (numeric value between 0 and 100) in 'Adversarial defense ratio (%)' Slider component		
// 				["Compare"], // undefined  in 'Mode' Checkboxgroup component
// 	]);

// console.log(result.data);
