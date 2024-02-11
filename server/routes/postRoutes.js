import express from "express"

import * as dotenv from 'dotenv'
import {V2 as cloudinary } from 'cloudinary';
import Post from '../mongodb/models/post.js'
dotenv.config()

const router = express.Router()
