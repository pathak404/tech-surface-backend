import { NextFunction, Request, Response } from "express";
import { RequestValidation } from "../types";
import { ReqForworder, verifyRequestData } from "../utils";


const addExamData: RequestValidation = {
    name: {
        type: 'string',
        required: true,
    },
    courseId: {
        type: 'string',
        required: true,
    },
    batchId: {
        type: 'string',
        required: true,
    },
    examDate: {
        type: 'date',
        required: true,
    },
}


const getExamData: RequestValidation = {
    examId: {
        type: 'string',
        required: true,
    },
}

const updateExamData: RequestValidation = {
    ...getExamData,
    ...addExamData,
}

export const examMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let isValidRequest;
    switch (req.method){
        case 'GET':
            isValidRequest = await verifyRequestData(req, getExamData)
            break
        case 'POST':
            isValidRequest = await verifyRequestData(req, addExamData)
            break
        case 'PUT':
            isValidRequest = await verifyRequestData(req, updateExamData)
            break
        default:
            next()
    }
    isValidRequest && ReqForworder(isValidRequest, res, next)
}
