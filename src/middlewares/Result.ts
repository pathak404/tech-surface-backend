import { NextFunction, Request, Response } from "express";
import { RequestValidation } from "../types";
import { ReqForworder, verifyRequestData } from "../utils";


const addResultData : RequestValidation = {
    examId:{
        type: 'string',
        required: true,
    },
    answers:{
        type: 'object',
        required: true,
    },
}

const getResult: RequestValidation = {
    resultId: {
        type: 'string',
        required: true,
    }
}


export const resultMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let isValidRequest;
    switch(req.method){
        case 'GET':
            isValidRequest = verifyRequestData(req, getResult)
            break
        case 'POST':
            isValidRequest = verifyRequestData(req, addResultData)
            break
        default:
            next()
    }
    isValidRequest && ReqForworder(isValidRequest, res, next)
}
