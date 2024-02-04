import express, { Application, NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import dotEnv from "dotenv"

import router from "./src/routes"
import { sendResponseMiddleware } from "./src/utils"
import { studentMiddleware } from "./src/middleware/Student"
import { courseMiddleware } from "./src/middleware/Course"
import { batchMiddleware } from "./src/middleware/Batch"
import { examMiddleware } from "./src/middleware/Exam"
import { questionMiddleware } from "./src/middleware/Question"


dotEnv.config();

const app: Application = express()
const port: number = 3000 || process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({origin: process.env.FRONTEND_URL}))

mongoose.connect(process.env.MONGODB_URL)

mongoose.connection.on("error", (err)=> {
    console.log(err)
    process.exit(0)
})


app.use(sendResponseMiddleware)

app.use("/student", studentMiddleware)
app.use("/course", courseMiddleware)
app.use("/batch", batchMiddleware)
app.use("/exam", examMiddleware)
app.use("/question", questionMiddleware)

app.use(router)


// default error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack)
    res.sendResponse({
        message: "Internal server error: +"+ err
    }, 500)
})

app.listen(port, ()=>{
    console.log("server is running on port: " + port)
})

process.on("SIGINT", ()=> {
    mongoose.connection.close()
})
