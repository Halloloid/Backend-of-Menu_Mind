const express = require("express")
const cors = require("cors");
const router = require("./router/indsideroutes");
const dotenv = require("dotenv")

dotenv.config();

const app = express();

app.use(cors({origin:'http://localhost:5173'}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api",router)

app.listen(3000,()=>{
    console.log("Server Running")
})