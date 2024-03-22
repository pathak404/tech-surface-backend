import { Request, Response } from "express";
import Student from "../models/Student";
import mongoose from "mongoose";
import { formatDate } from "../utils";
import Payment from "../models/Payment";
import Result from "../models/Result";

export const addStudent = async (req: Request, res: Response) => {
    try{
        const {name, phone, totalFee, joiningDate, courseId, batchId} = req.body
        const student = new Student({
            _id: new mongoose.Types.ObjectId(), 
            name, 
            phone, 
            totalFee, 
            joiningDate, 
            courseId, 
            batchId
        })

        const savedStudent = await student.save()
        res.sendResponse({
            message: "Student data added successfully",
            student: savedStudent
        })

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while adding a new student"
        }, 500)
    }
}

export const getStudent = async (req: Request, res: Response) => {
    try{
        const studentId = req.params.studentId
        const savedStudent = await Student.findOne({studentId})
        if(savedStudent){
            res.sendResponse({
                message: "Student data fetched successfully",
                student: savedStudent
            })
        }else {
            res.sendResponse({
                message: "No student found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching student data"
        }, 500)
    }
}


export const getStudents = async (req: Request, res: Response) => {
    try{
        const savedStudents = await Student.find({}, "studentId name phone totalFee courseId batchId joiningDate").sort({ createdAt: -1 })
        if(savedStudents){
            const rearrangedStudents = savedStudents.map(student => ({
                studentId: student.studentId,
                name: student.name,
                phone: student.phone,
                totalFee: student.totalFee,
                courseId: student.courseId,
                batchId: student.batchId,
                joiningDate: formatDate(student.joiningDate)
            }));
            res.sendResponse({
                message: "Students data fetched successfully",
                students: rearrangedStudents
            })
        }else {
            res.sendResponse({
                message: "No student found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching students data"
        }, 500)
    }
}


export const updateStudent = async (req: Request, res: Response) => {
    try{
        const {name, phone, totalFee, joiningDate, courseId, batchId} = req.body
        const student = {
            name, 
            phone, 
            totalFee, 
            joiningDate, 
            courseId, 
            batchId
        }

        const updatedStudent = await Student.findOneAndUpdate({studentId: req.params.studentId}, student, {
            new: true
        })
        
        res.sendResponse({
            message: "Student data updated successfully",
            student: updatedStudent
        })

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while updaing student data"
        }, 500)
    }
}



export const deleteStudent = async (req:Request, res: Response) => {
    try{
        const studentId = req.params.studentId;
        const student = await Student.findOne({studentId});
        if(student){
            await Student.deleteOne({studentId});
            await Payment.deleteMany({studentId});
            await Result.deleteMany({studentId});
            res.sendResponse({ message: "Student deleted successfully",}, 200)
        }else{
            res.sendResponse({
                message: "No student found",
            }, 404)
        }

    }catch(err){
        console.log(err);
        res.sendResponse({
            message: "Error while deleting student data"
        }, 500)
    }
}