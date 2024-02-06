import { NextFunction, Request, Response } from "express"
import { DataType, RequestValidation } from "./types"
import { Model } from "mongoose"
import JWT, { JwtPayload } from "jsonwebtoken"


export const generateRandomString = (len: number):string => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let res = ''
    for(let i=0; i<len; i++){
        const randomIndex = Math.floor(Math.random() * characters.length)
        res += characters.charAt(randomIndex)
    }
    return res
}


export const verifyRequestData = async <T extends RequestValidation, M extends Model<any>>
(req: Request, data: T, model?: M, next?: NextFunction): Promise<true | Record<string, any>> => {
    const reqData = {
        ...req.body,
        ...req.params,
    }
    let validationsErrors: Record<string, any> = {}
    for (const [key, config] of Object.entries(data)){
        if(config.required && !reqData.hasOwnProperty(key) ){
            validationsErrors[key] = key+" field is required"
        }else if(config.required && reqData[key] === undefined || reqData[key] === null || reqData[key] === ''){
            validationsErrors[key] = key+" field is empty"
        }else if(!isValidType(reqData[key], config.type)){
            validationsErrors[key] = key+" has invalid datatype"
        }else if(config.unique && model && next){
            try{
                const len = await model.countDocuments({[key]: reqData[key]})
                if(len !== 0){
                    validationsErrors[key] = key+" already exists"
                }
            }catch(err){
                next(err) // let express handle this
            }
        }
    }
    return Object.keys(validationsErrors).length === 0 ? true : validationsErrors
}


const isValidType = (value: any, type: DataType): boolean => {
    switch(type){
        case 'string':
            return typeof value === 'string'
        case 'number':
            return typeof value === 'number'
        case 'array': 
            return Array.isArray(value)
        case 'boolean': 
            return typeof value === 'boolean'
        case 'object': 
            return typeof value === 'object' && !Array.isArray(value) // must not a array or array of obj
        case 'date':
            // new Date(true/false) does not throw error and act as valid date if passed to Date class
            return value instanceof Date || !isNaN(new Date(value).getTime()) && typeof value !== "boolean"
        case 'any':
            return true
        default:
            return false;
    }
}

export const ReqForworder = (data: true | Record<string, any>, res: Response, next: NextFunction) => {
    if(data){
        next()
    }else{
        res.sendResponse({
            ...data as Record<string, any>
        }, 400)
    }
}


export const sendResponseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.sendResponse = (data: Record<string, any>, statusCode: number = 200) => {
        res.status(statusCode).json({
            success: statusCode >=200 && statusCode <= 299 ? true : false,
            ...data
        })
    }
    next()
}


export const generateJWT = (payload: JwtPayload, expiresIn: number = 172800) => {
    return JWT.sign(payload, process.env.SECRET_KEYPHRASE, {
        expiresIn: expiresIn * 1000 // in seconds
    })
}

const verifyJWT = (token: string) => {
    return JWT.verify(token, process.env.SECRET_KEYPHRASE)
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.get("Authorization") // Bearer type
    const token = authorization?.split(" ")[1] ?? undefined
    if(token){
        const payload = verifyJWT(token)
        if(payload){
            req.isAdmin = (payload as JwtPayload)?.isAdmin
            req.userId = (payload as JwtPayload)?.userId
            next()
        }else{
            res.sendResponse({message: "Invalid Authorization Value"}, 403)
        }
    }else{
        res.sendResponse({message: "Authorization header not found"}, 403)
    }
}

