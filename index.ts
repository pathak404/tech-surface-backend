import express, { Application, NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import dotEnv from "dotenv"

import router from "./src/routes"
import { authMiddleware, sendResponseMiddleware } from "./src/utils"
import { studentMiddleware } from "./src/middlewares/Student"
import { courseMiddleware } from "./src/middlewares/Course"
import { batchMiddleware } from "./src/middlewares/Batch"
import { examMiddleware } from "./src/middlewares/Exam"
import { questionMiddleware } from "./src/middlewares/Question"


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

app.use("/student", [authMiddleware, studentMiddleware])
app.use("/course", [authMiddleware, courseMiddleware])
app.use("/batch", [authMiddleware, batchMiddleware])
app.use("/exam", [authMiddleware, examMiddleware])
app.use("/question", [authMiddleware, questionMiddleware])


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
