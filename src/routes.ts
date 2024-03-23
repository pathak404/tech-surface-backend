import { Response, Router } from "express"
import { addStudent, deleteStudent, getStudent, getStudents, updateStudent } from "./controllers/Student"
import { addExam, getExam, getExams, updateExam } from "./controllers/Exam"
import { addQuestion, deleteQuestion, getQuestion, getQuestions, updateQuestion } from "./controllers/Question"
import { addCourse, getCourse, getCourses, updateCourse } from "./controllers/Course"
import { addBatch, getBatch, getBatches, updateBatch } from "./controllers/Batch"
import { addAdmin, getAdmin, getAdmins, updateAdmin } from "./controllers/Admin"
import { adminLoginMiddleware, isStudentMiddleware, studentLoginMiddleware } from "./middlewares/Common"
import { adminLogin, getStatistics, studentLogin } from "./controllers/Common"
import { batchMiddleware } from "./middlewares/Batch"
import { questionMiddleware } from "./middlewares/Question"
import { addResult, getResult, getResults } from "./controllers/Result"
import { examMiddleware } from "./middlewares/Exam"
import { resultMiddleware } from "./middlewares/Result"
import { courseMiddleware } from "./middlewares/Course"
import { studentMiddleware } from "./middlewares/Student"
import { adminMiddleware } from "./middlewares/Admin"
import { paymentMiddleware } from "./middlewares/Payment"
import { addPayment, deletePayment, getPayments, updatePayment } from "./controllers/Payment"

const router:Router = Router()

router.get("/", ( {res}: {res: Response} )=>{
    res.sendResponse({
        message: "Welcome boss!"
    })
})





// exams
router.get("/exams", getExams)
router.post("/exams/new", examMiddleware, addExam)
router.get("/exams/:examId", examMiddleware, getExam)
router.put("/exams/:examId", examMiddleware, updateExam)
// questions
router.get("/exams/:examId/questions", examMiddleware, getQuestions)
router.post("/exams/:examId/questions/new", questionMiddleware, addQuestion)
router.get("/exams/:examId/questions/:questionId", examMiddleware, questionMiddleware, getQuestion)
router.put("/exams/:examId/questions/:questionId", questionMiddleware, updateQuestion)
router.delete("/exams/:examId/questions/:questionId", deleteQuestion)
// results
router.get("/exams/:examId/results", examMiddleware, getResults)
router.get("/exams/:examId/results/:resultId", examMiddleware, resultMiddleware, getResult)


// courses
router.get("/courses", getCourses)
router.post("/courses/new", courseMiddleware, addCourse)
router.get("/courses/:courseId", courseMiddleware, getCourse)
router.put("/courses/:courseId", courseMiddleware, updateCourse)
// batches
router.get("/courses/:courseId/batches", courseMiddleware, getBatches)
router.post("/courses/:courseId/batches/new", batchMiddleware, addBatch)
router.get("/courses/:courseId/batches/:batchId", courseMiddleware, batchMiddleware, getBatch)
router.put("/courses/:courseId/batches/:batchId", batchMiddleware, updateBatch)

// admins
router.get("/admins", getAdmins)
router.post("/admins/new", adminMiddleware, addAdmin)
router.get("/admins/:adminId", adminMiddleware, getAdmin)
router.put("/admins/:adminId", adminMiddleware, updateAdmin)

router.get("/statistic", getStatistics)
router.post("/admin/login", adminLoginMiddleware, adminLogin)

// students
router.get("/students", getStudents)
router.post("/students/new", studentMiddleware, addStudent)
router.get("/students/:studentId", studentMiddleware, getStudent)
router.put("/students/:studentId", studentMiddleware, updateStudent)
router.delete("/students/:studentId", studentMiddleware, deleteStudent)

// payments
router.get("/students/:studentId/payments", paymentMiddleware, getPayments)
router.post("/students/:studentId/payments/new", paymentMiddleware, addPayment)
router.put("/students/:studentId/payments/:paymentId", paymentMiddleware, updatePayment)
router.delete("/students/:studentId/payments/:paymentId", paymentMiddleware, deletePayment)
// router.get("/students/:studentId/payments/:paymentId", paymentMiddleware, getPayment)

router.post("/student/login", studentLoginMiddleware, studentLogin)
router.post("/exams/:examId/results/new", isStudentMiddleware, resultMiddleware, addResult)


export default router
