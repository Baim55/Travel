import express from "express"
import "dotenv/config"
import "./src/db/dbConnection.js"
import cors from "cors"
import productRouter from "./src/routes/productRouter.js"
import userRouter from "./src/routes/userRouter.js"

const app = express()
const port = process.env.PORT || 5001

app.use(express.json())
app.use(cors())
app.use("/api/products",productRouter)
app.use("/api/users",userRouter)

app.listen(port,()=>{
   console.log(`server is running ${`http://localhost:${port}`}`)
})