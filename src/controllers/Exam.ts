import { Request, Response } from "express";
import Exam from "../models/Exam";
import mongoose from "mongoose";
import { formatDateTime } from "../utils";


export const addExam = async (req: Request, res: Response) => {
    try{
        const {courseId, batchId, name, examDate} = req.body
        const exam = new Exam({
            _id: new mongoose.Types.ObjectId(), 
            name, 
            courseId,
            batchId,
            examDate,
        })

        const savedExam = await exam.save()
        res.sendResponse({
            message: "Exam data added successfully",
            exam: savedExam
        })

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while adding a new exam"
        }, 500)
    }
}

export const getExam = async (req: Request, res: Response) => {
    try{
        const examId = req.params.examId
        const savedExam = await Exam.findOne({examId})
        if(savedExam){
            res.sendResponse({
                message: "Exam data fetched successfully",
                exam: savedExam
            })
        }else {
            res.sendResponse({
                message: "No exam found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching exam data"
        }, 500)
    }
}



export const getExams = async (req: Request, res: Response) => {
    try{
        const savedExams = await Exam.find({}).sort({createdAt: -1})
        const rearrangedExams = savedExams.map((exam) => ({
            examId: exam.examId,
            name: exam.name,
            courseId: exam.courseId,
            batchId: exam.batchId,
            examDate: formatDateTime(exam.examDate),
        }))

        if(savedExams){
            res.sendResponse({
                message: "Exams data fetched successfully",
                exams: rearrangedExams,
            })
        }else {
            res.sendResponse({
                message: "No exam found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching exams data"
        }, 500)
    }
}


export const updateExam = async (req: Request, res: Response) => {
    try{
        const {courseId, batchId, name, examDate} = req.body
        const exam = {
            name, 
            courseId,
            batchId,
            examDate,
        }

        const updatedExam = await Exam.findOneAndUpdate({examId: req.params.examId}, exam, {
            new: true
        })
        
        res.sendResponse({
            message: "Exam data updated successfully",
            exam: updatedExam
        })

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while updaing exam data"
        }, 500)
    }
}


