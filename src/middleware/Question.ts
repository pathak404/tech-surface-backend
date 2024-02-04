import { NextFunction, Request, Response } from "express";
import { ReqForworder, verifyRequestData } from "../utils";
import { RequestValidation } from "../types";


const getQuestionData : RequestValidation = {
    questionId: {
        type: 'string',
        required: true,
    },
}

const addQuestionData : RequestValidation = {
    examId: {
        type: 'string',
        required: true,
    },
    question: {
        type: 'string',
        required: true,
    },
    options: {
        type: 'array',
        required: true,
    },
    answer: {
        type: 'any',
        required: true,
    },
}

const updateQuestionData : RequestValidation = {
    ...getQuestionData,
    ...addQuestionData,
}

export const questionMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let isValidRequest;
    switch (req.method){
        case 'GET':
            isValidRequest = await verifyRequestData(req, getQuestionData)
            break
        case 'POST':
            isValidRequest = await verifyRequestData(req, addQuestionData)
            break
        case 'PUT':
            isValidRequest = await verifyRequestData(req, updateQuestionData)
            break
        default:
            next()
    }
    isValidRequest && ReqForworder(isValidRequest, res, next)
}
