import { NextFunction, Request, Response } from "express";
import { RequestValidation } from "../types";
import { ReqForworder, verifyRequestData } from "../utils";


const getBatchData : RequestValidation = {
    batchId: {
        type: 'string',
        required: true,
    },
}

const addBatchData : RequestValidation= {
    courseId: {
        type: 'string',
        required: true,
    },
    name: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: true,
    },
    startDate: {
        type: 'date',
        required: true,
    },
    endDate: {
        type: 'date',
        required: true,
    },
}

const updateBatchData : RequestValidation = {
    ...getBatchData,
    ...addBatchData,
}



export const batchMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let isValidRequest;
    switch (req.method){
        case 'GET':
            isValidRequest = await verifyRequestData(req, getBatchData)
            break
        case 'POST':
            isValidRequest = await verifyRequestData(req, addBatchData)
            break
        case 'PUT':
            isValidRequest = await verifyRequestData(req, updateBatchData)
            break
        default:
            next()
    }
    isValidRequest && ReqForworder(isValidRequest, res, next)
}


