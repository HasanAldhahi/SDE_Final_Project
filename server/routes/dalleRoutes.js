import express from "express"
import * as dotenv from 'dotenv'
import {  OpenAI } from 'openai';
import axios from 'axios';


dotenv.config()
const router = express.Router()
// You need to pay 5$ for it 
// const openai = new OpenAI({
//     apikey: process.env.OPENAI_API_KEY
// })

//Routes
router.route('/').get((req, res) => {
    res.send('Hello from DALL-E!');
})


//req is coming from the frontend where the body is the prompt 
router.route('/').post(async (req, res) => {
    try{
        const {prompt} = req.body;
        console.log("hellllllllllllo")
        console.log(prompt)
         const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
           
         params: {
                key: process.env.GOOGLE_API_KEY,
                q: prompt,
                cx:"f1a5f1a5449b44cc6",
                searchType: 'image', // Example: to search for images
                // Add other parameters as needed
            }})
        // console.log(response.data.items)
        let myList = []
        for(let i = 0; i< 4; i++){
            myList.push(response.data.items[i])

        }
        res.status(200).json({list: myList});
    }

    catch(error) {
        console.log("thsnusner error: ")
        console.log(error)
        console.log("end of the error")
        res.status(500).send(error?.response)
    }
})
export default router

 