import express from "express";
import dotenv from "dotenv";
import router from "./Routes/userRoutes";

dotenv.config()
const app = express()

app.use(express.json())

app.use('/api/user',router)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`User service running on port ${PORT}`);
})