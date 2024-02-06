import { Request, Response } from "express";
import Result from "../models/Result";
import mongoose from "mongoose";
import Question from "../models/Question";


export const addResult = async (req: Request, res: Response) => {
    try{
        const examId = req.params.examId
        const answers = req.body.answers
        const questions = await Question.find({examId}, "questionId answer")

        let correct = 0;
        let incorrect = 0;
        if(questions){
            questions.map((question) => {
                if(answers[question.questionId] != question.answer){
                    incorrect++
                }else{
                    correct++
                }
            })

            const addRes = new Result({
                _id: new mongoose.Types.ObjectId(), 
                examId,
                studentId: req.userId, 
                answers,
                correctAnswers: correct,
                incorrectAnswers: incorrect,
            })

            const savedResult = await addRes.save()
            res.sendResponse({
                message: "Result data added successfully",
                result: savedResult
            })

        }else{
            res.sendResponse({
                message: "No questions are available for this examination",
            }, 402)
        }
    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while adding a new result"
        }, 500)
    }
}

export const getResult = async (req: Request, res: Response) => {
    try{
        const resultId = req.params.resultId
        const savedResult = await Result.findOne({resultId})
        if(savedResult){
            res.sendResponse({
                message: "Result data fetched successfully",
                result: savedResult
            })
        }else {
            res.sendResponse({
                message: "No result found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching result data"
        }, 500)
    }
}

export const getResults = async (req: Request, res: Response) => {
    try{
        const examId = req.params.examId
        const savedResult = await Result.find({examId})
        if(savedResult){
            res.sendResponse({
                message: "Results data fetched successfully",
                result: savedResult
            })
        }else {
            res.sendResponse({
                message: "No result found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching results data"
        }, 500)
    }
}


