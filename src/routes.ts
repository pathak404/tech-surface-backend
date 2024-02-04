import { Request, Response, Router } from "express"
import { addStudent, getStudent, updateStudent } from "./controllers/Student"

const router:Router = Router()

router.get("/", (req: Request, res: Response)=>{
    res.sendResponse({
        message: "Welcome boss!"
    })
})


router.post("/student", addStudent)
router.get("/student/:studentId", getStudent)
router.put("/student/:studentId", updateStudent)



export default router