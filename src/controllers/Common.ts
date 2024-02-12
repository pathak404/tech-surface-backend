import { Request, Response } from "express"
import Admin from "../models/Admin"
import { generateJWT } from "../utils"
import Student from "../models/Student"
import Exam from "../models/Exam"


export const adminLogin = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body
        const savedAdmin = await Admin.findOne({email})
        if(savedAdmin && savedAdmin.verifyPassword(password)){
            const token = generateJWT({
                isAdmin: true,
                userId: savedAdmin.adminId
            })

            res.sendResponse({
                message: "Admin login successful",
                token,
                admin: {
                    adminId: savedAdmin.adminId,
                    name: savedAdmin.name,
                    email: savedAdmin.email,
                    createdAt: savedAdmin.createdAt
                },
            })
        }else {
            res.sendResponse({
                message: "Invalid Credentials",
            }, 404)
        }
    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while admin login"
        }, 500)
    }

}


export const studentLogin = async (req: Request, res: Response) => {
    try{
        const {phone, examId} = req.body
        const student = await Student.findOne({phone})
        const exam = await Exam.findOne({examId})
        if(student){
            if(exam){
                if(student.courseId === exam.courseId && student.batchId === exam.batchId){
                    const token = generateJWT({isAdmin: false, userId: student.studentId})
                    res.sendResponse({
                        message: "Student login successful",
                        token,
                        student,
                        exam
                    }, 200)
                }else{
                    res.sendResponse({
                        message: "You are not allowed to give this exam. Check your course and batch"
                    }, 403)
                }
            }else{
                res.sendResponse({
                    message: "Exam code is invalid"
                }, 400)
            }
        }else{
            res.sendResponse({
                message: "Student not exist"
            }, 404)
        }
    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while student login"
        }, 500)
    }
}

