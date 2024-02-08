import { Request, Response } from "express";
import Student from "../models/Student";
import mongoose from "mongoose";
import { ParsedQs } from "../types";

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
        const savedStudent = await Student.find({}).sort({ createdAt: -1 })
        if(savedStudent){
            res.sendResponse({
                message: "Students data fetched successfully",
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