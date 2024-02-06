import mongoose, { Schema, model } from "mongoose";
import { ResultDocument } from "../types";
import { generateRandomString } from "../utils";


const resultSchema : Schema<ResultDocument> = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    resultId: {
        type: mongoose.Schema.Types.String,
    },
    examId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    answers: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        required: true,
    },
    correctAnswers: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    incorrectAnswers: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    submittedAt: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now
    },
})


resultSchema.methods.setResultId = function(this:ResultDocument){
    this.resultId = "RES"+generateRandomString(5)+(Math.floor(Math.random() * 100000) + 1)
}

resultSchema.pre<ResultDocument>("save", function(next){
    this.setResultId()
    next()
})


const Result = model<ResultDocument>("results", resultSchema)
export default Result
