import { NextFunction, Request, Response } from "express"
import { RequestValidation } from "../types"
import { ReqForworder, verifyRequestData } from "../utils"

const addPaymentData: RequestValidation = {
    studentId: {
        type: 'string',
        required: true,
    },
    method: {
        type: 'string',
        required: true,
    },
    txnId: {
        type: 'string',
        required: true,
    },
    description: {
        type: 'string',
        required: false,
    },
    amount: {
        type: 'number',
        required: true,
    },
}


const getPaymentsData: RequestValidation = {
    studentId: {
        type: 'string',
        required: true
    }
}

const getPaymentData: RequestValidation = {
    paymentId: {
        type: 'string',
        required: true,
    },
    ...getPaymentsData,
}


const updatePaymentData: RequestValidation = {
    ...getPaymentData,
    ...addPaymentData
}


export const paymentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let isValidRequest;
    switch (req.method){
        case 'GET':
            isValidRequest = await verifyRequestData(req, getPaymentsData)
            break
        case 'POST':
            isValidRequest = await verifyRequestData(req, addPaymentData)
            break
        case 'PUT':
            isValidRequest = await verifyRequestData(req, updatePaymentData)
            break
        case 'DELETE':
            isValidRequest = await verifyRequestData(req, getPaymentData)
            break
        default:
            next()
    }
    isValidRequest && ReqForworder(isValidRequest, res, next)
}

