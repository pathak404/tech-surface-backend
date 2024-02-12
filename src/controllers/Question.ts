import e, { Request, Response } from "express";
import Question from "../models/Question";
import mongoose from "mongoose";


export const addQuestion = async (req: Request, res: Response) => {
    try{
        const examId = req.params.examId
        const {question, options, answer} = req.body
        const addQues = new Question({
            _id: new mongoose.Types.ObjectId(), 
            examId,
            question, 
            options,
            answer,
        })

        const savedQuestion = await addQues.save()
        res.sendResponse({
            message: "Question data added successfully",
            question: savedQuestion
        })

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while adding a new question"
        }, 500)
    }
}

export const getQuestion = async (req: Request, res: Response) => {
    try{
        const questionId = req.params.questionId
        const savedQuestion = await Question.findOne({questionId})
        if(savedQuestion){
            res.sendResponse({
                message: "Question data fetched successfully",
                question: savedQuestion
            })
        }else {
            res.sendResponse({
                message: "No question found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching question data"
        }, 500)
    }
}


export const getQuestions = async (req: Request, res: Response) => {
    try{
        const examId = req.params.examId

        let savedQuestions;
        savedQuestions = await Question.find({examId})
        // console.log(req.isAdmin)
        // if(req.isAdmin){
        //     savedQuestions = await Question.find({examId})
        // }else{
        //     savedQuestions = await Question.find({examId}, "questionId question options")
        // }

        if(savedQuestions){
            res.sendResponse({
                message: "Questions data fetched successfully",
                questions: savedQuestions
            })
        }else {
            res.sendResponse({
                message: "No question found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching questions data"
        }, 500)
    }
}


export const updateQuestion = async (req: Request, res: Response) => {
    try{
        const examId = req.params.examId
        const {question, options, answer} = req.body
        const updateQues = {
            examId,
            question, 
            options,
            answer,
        }

        const updatedQuestion = await Question.findOneAndUpdate({questionId: req.params.questionId}, updateQues, {
            new: true
        })
        
        res.sendResponse({
            message: "Question data updated successfully",
            question: updatedQuestion
        })

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while updaing question data"
        }, 500)
    }
}


