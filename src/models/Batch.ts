import mongoose, { Schema, model } from "mongoose"
import { BatchDocument } from "../types"
import { generateRandomString } from "../utils"


const batchSchema: Schema<BatchDocument> = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    batchId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    courseId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    startDate: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    endDate: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now,
    },
})

batchSchema.methods.setBatchId = function(this: BatchDocument): void {
    this.batchId = "BCH"+generateRandomString(5)+ (Math.floor(Math.random() * 100000) + 1)
}

batchSchema.pre<BatchDocument>("save", function(next){
    this.setBatchId()
    next()
})


const Batch = model<BatchDocument>("batches", batchSchema)
export default Batch
