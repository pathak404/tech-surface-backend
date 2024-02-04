import { NextFunction, Request, Response } from "express";
import { ReqForworder, verifyRequestData } from "../utils";
import { RequestValidation } from "../types";


const getCourseData : RequestValidation = {
    courseId: {
        type: 'string',
        required: true,
    }
}

const addCourseData : RequestValidation = {
    name: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
}


const updateCourseData : RequestValidation = {
    ...getCourseData,
    ...addCourseData,
}



export const courseMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let isValidRequest;
    switch (req.method){
        case 'GET':
            isValidRequest = await verifyRequestData(req, getCourseData)
            break
        case 'POST':
            isValidRequest = await verifyRequestData(req, addCourseData)
            break
        case 'PUT':
            isValidRequest = await verifyRequestData(req, updateCourseData)
            break
        default:
            next()
    }
    isValidRequest && ReqForworder(isValidRequest, res, next)
}


