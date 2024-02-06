import { NextFunction, Request, Response } from "express";
import { ReqForworder, verifyRequestData } from "../utils";
import { RequestValidation } from "../types";
import Admin from "../models/Admin";


const getAdminData : RequestValidation = {
    adminId: {
        type: 'string',
        required: true,
    }
}

const addAdminData : RequestValidation = {
    name: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
    },
}


const updateAdminData : RequestValidation = {
    ...getAdminData,
    ...addAdminData,
}



export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let isValidRequest;
    switch (req.method){
        case 'GET':
            isValidRequest = await verifyRequestData(req, getAdminData)
            break
        case 'POST':
            isValidRequest = await verifyRequestData(req, addAdminData, Admin, next)
            break
        case 'PUT':
            isValidRequest = await verifyRequestData(req, updateAdminData)
            break
        default:
            next()
    }
    isValidRequest && ReqForworder(isValidRequest, res, next)
}


