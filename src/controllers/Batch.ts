import { Request, Response } from "express";
import Batch from "../models/Batch";
import mongoose from "mongoose";
import { formatDateTime } from "../utils";


export const addBatch = async (req: Request, res: Response) => {
    try{
        const courseId = req.params.courseId
        const {name, description, startDate, endDate} = req.body
        const batch = new Batch({
            _id: new mongoose.Types.ObjectId(), 
            name, 
            description,
            courseId,
            startDate,
            endDate,
        })

        const savedBatch = await batch.save()
        res.sendResponse({
            message: "Batch data added successfully",
            batch: savedBatch
        })

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while adding a new batch"
        }, 500)
    }
}

export const getBatch = async (req: Request, res: Response) => {
    try{
        const batchId = req.params.batchId
        const savedBatch = await Batch.findOne({batchId})
        if(savedBatch){
            res.sendResponse({
                message: "Batch data fetched successfully",
                batch: savedBatch
            })
        }else {
            res.sendResponse({
                message: "No batch found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching batch data"
        }, 500)
    }
}

export const getBatches = async (req: Request, res: Response) => {
    try{
        const courseId = req.params.courseId
        const savedBatches = await Batch.find({courseId}).sort({ createdAt: -1 })
        if(savedBatches){
            const rearrangedBaches = savedBatches.map((batch) => ({
                batchId: batch.batchId,
                name: batch.name,
                description: batch.description,
                startDate: formatDateTime(batch.startDate),
                endDate: formatDateTime(batch.endDate),
                courseId: batch.courseId,
            }))
            res.sendResponse({
                message: "Batches data fetched successfully",
                batches: rearrangedBaches
            })
        }else {
            res.sendResponse({
                message: "No batch found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching batches data"
        }, 500)
    }
}


export const updateBatch = async (req: Request, res: Response) => {
    try{
        const courseId = req.params.courseId
        const {name, description, startDate, endDate} = req.body
        const batch = {
            name, 
            description,
            courseId,
            startDate,
            endDate,
        }

        const updatedBatch = await Batch.findOneAndUpdate({batchId: req.params.batchId}, batch, {
            new: true
        })
        
        res.sendResponse({
            message: "Batch data updated successfully",
            batch: updatedBatch
        })

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while updaing batch data"
        }, 500)
    }
}


