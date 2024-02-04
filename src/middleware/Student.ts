import { NextFunction, Request, Response } from "express"
import { RequestValidation } from "../types"
import { ReqForworder, verifyRequestData } from "../utils"
import Student from "../models/Student"

const addStudentData: RequestValidation = {
    name: {
        type: 'string',
        required: true,
    },
    phone: {
        type: 'string',
        required: true,
        unique: true,
    },
    totalFee: {
        type: 'number',
        required: true,
    },
    joiningDate: {
        type: 'date',
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
}


const getStudentData: RequestValidation = {
    studentId: {
        type: 'string',
        required: true
    }
}

const updateStudentData: RequestValidation = {
    ...getStudentData,
    ...addStudentData,
}

export const studentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let isValidRequest;
    switch (req.method){
        case 'GET':
            isValidRequest = await verifyRequestData(req, getStudentData)
            break
        case 'POST':
            isValidRequest = await verifyRequestData(req, addStudentData, Student, next)
            break
        case 'PUT':
            isValidRequest = await verifyRequestData(req, updateStudentData)
            break
        default:
            next()
    }
    isValidRequest && ReqForworder(isValidRequest, res, next)
}

