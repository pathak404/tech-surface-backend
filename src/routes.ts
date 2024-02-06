import { Request, Response, Router } from "express"
import { addStudent, getStudent, updateStudent } from "./controllers/Student"
import { addExam, getExam, updateExam } from "./controllers/Exam"
import { addQuestion, getQuestion, getQuestions, updateQuestion } from "./controllers/Question"
import { addCourse, getCourse, updateCourse } from "./controllers/Course"
import { addBatch, getBatch, updateBatch } from "./controllers/Batch"
import { addAdmin, getAdmin, updateAdmin } from "./controllers/Admin"
import { adminLoginMiddleware, isStudentMiddleware, studentLoginMiddleware } from "./middlewares/Common"
import { adminLogin, studentLogin } from "./controllers/Common"
import { batchMiddleware } from "./middlewares/Batch"
import { questionMiddleware } from "./middlewares/Question"
import { addResult, getResult, getResults } from "./controllers/Result"
import { examMiddleware } from "./middlewares/Exam"
import { resultMiddleware } from "./middlewares/Result"
import { courseMiddleware } from "./middlewares/Course"
import { studentMiddleware } from "./middlewares/Student"
import { adminMiddleware } from "./middlewares/Admin"
import { authMiddleware } from "./utils"

const router:Router = Router()

router.get("/", (req: Request, res: Response)=>{
    res.sendResponse({
        message: "Welcome boss!"
    })
})

// authentication
router.use("/students", authMiddleware, studentMiddleware)
router.use("/courses", authMiddleware)
router.use("/exams", authMiddleware)
router.use("/admins", authMiddleware, adminMiddleware)



// exams
router.post("/exams/new", examMiddleware, addExam)
router.get("/exams/:examId", examMiddleware, getExam)
router.put("/exams/:examId", examMiddleware, updateExam)
// questions and results
router.get("/exams/:examId/questions", examMiddleware, getQuestions)
router.post("/exams/:examId/questions/new", questionMiddleware, addQuestion)
router.get("/exams/:examId/questions/:questionId", examMiddleware, questionMiddleware, getQuestion)
router.put("/exams/:examId/questions/:questionId", questionMiddleware, updateQuestion)
router.get("/exams/:examId/results", examMiddleware, getResults)
router.get("/exams/:examId/results/:resultId", examMiddleware, resultMiddleware, getResult)


// courses
router.post("/courses/new", courseMiddleware, addCourse)
router.get("/courses/:courseId", courseMiddleware, getCourse)
router.put("/courses/:courseId", courseMiddleware, updateCourse)
// batches
router.post("/courses/:courseId/batches/new", batchMiddleware, addBatch)
router.get("/courses/:courseId/batches/:batchId", courseMiddleware, batchMiddleware, getBatch)
router.put("/courses/:courseId/batches/:batchId", batchMiddleware, updateBatch)


router.post("/admins/add", addAdmin)
router.get("/admins/:adminId", getAdmin)
router.put("/admins/:adminId", updateAdmin)
router.post("/admin/login", adminLoginMiddleware, adminLogin)


router.post("/students/add", addStudent)
router.get("/students/:studentId", getStudent)
router.put("/students/:studentId", updateStudent)
router.post("/student/login", studentLoginMiddleware, studentLogin)
router.post("/exams/:examId/results/new", isStudentMiddleware, resultMiddleware, addResult)


export default router
