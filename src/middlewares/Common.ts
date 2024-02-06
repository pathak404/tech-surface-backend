import { NextFunction, Request, Response } from "express";
import { RequestValidation } from "../types";
import { ReqForworder, verifyRequestData } from "../utils";


const adminLoginData : RequestValidation = {
    email: {
        type: 'string',
        required: true,
    },
    password: {
        type: 'string',
        required: true,
    }
}

const studentLoginData : RequestValidation = {
    examId: {
        type: 'string',
        required: true,
    },
    phone: {
        type: 'number',
        required: true,
    }
}


export const adminLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isValidRequest = verifyRequestData(req, adminLoginData)
    ReqForworder(isValidRequest, res, next)
}

export const studentLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const isValidRequest = verifyRequestData(req, studentLoginData)
    ReqForworder(isValidRequest, res, next)
}


// for students only
export const isStudentMiddleware =  (req: Request, res: Response, next: NextFunction) => {
    if(req.method == 'POST' && req.isAdmin){
        res.sendResponse({message: "This operation is allowed for students only"}, 401)
    }else{
        next()
    }
}

