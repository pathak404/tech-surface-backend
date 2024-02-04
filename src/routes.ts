import { Request, Response, Router } from "express"
import { addStudent, getStudent, updateStudent } from "./controllers/Student"
import { addExam, getExam, updateExam } from "./controllers/Exam"
import { addQuestion, getQuestion, updateQuestion } from "./controllers/Question"
import { addCourse, getCourse, updateCourse } from "./controllers/Course"
import { addBatch, getBatch, updateBatch } from "./controllers/Batch"

const router:Router = Router()

router.get("/", (req: Request, res: Response)=>{
    res.sendResponse({
        message: "Welcome boss!"
    })
})


router.post("/student", addStudent)
router.get("/student/:studentId", getStudent)
router.put("/student/:studentId", updateStudent)

router.post("/exam", addExam)
router.get("/exam/:examId", getExam)
router.put("/exam/:examId", updateExam)

router.post("/question", addQuestion)
router.get("/question/:questionId", getQuestion)
router.put("/question/:questionId", updateQuestion)

router.post("/course", addCourse)
router.get("/course/:courseId", getCourse)
router.put("/course/:courseId", updateCourse)

router.post("/batch", addBatch)
router.get("/batch/:batchId", getBatch)
router.put("/batch/:batchId", updateBatch)

export default router
