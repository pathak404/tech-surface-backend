import { NextFunction, Request, Response } from "express"
import { RequestValidation } from "../types"
import { ReqForworder, verifyRequestData } from "../utils"
import Payment from "../models/Payment"

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


export const paymentMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let isValidRequest;
    switch (req.method){
        case 'GET':
            isValidRequest = await verifyRequestData(req, getPaymentsData)
            break
        case 'POST':
            isValidRequest = await verifyRequestData(req, addPaymentData, Payment, next)
            break
        default:
            next()
    }
    isValidRequest && ReqForworder(isValidRequest, res, next)
}

