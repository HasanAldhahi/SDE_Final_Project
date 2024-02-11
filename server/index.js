import express from "express"   ;
import * as dotenv from 'dotenv';
import cors from "cors";
import connectDB from "./mongodb/connect.js"


import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"


//pull the environment variables 
dotenv.config();

//making express app
const app = express();
//let the app use the cross origin response 
app.use(cors());

//set limit for 50 mb 
app.use(express.json({limit: '50mb'}));



//MiddelWare 

app.use('/api/v1/post', pastRoutes)
app.use('/api/v1/dalle', dalleRoutes)

//set the Routes 
app.get('/', async(req,res) => {
    res.send('Hello from DALL-E!');
})
// making the port for 
const startServer = async () =>{

    //connecting to the mongo DB can fail therefor we will try to connect to them with try
    try {
        connectDB(process.env.MONGODB_URL);
         app.listen(8080, () => console.log('Server has started on port  http://localhost:8080'))
    }
    catch(error){
        console.log("Erorr is ", error)
    }
   
}
startServer();










