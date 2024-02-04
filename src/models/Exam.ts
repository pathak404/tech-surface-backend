import mongoose, { Schema, model } from "mongoose"
import { ExamDocument } from "../types"
import { generateRandomString } from "../utils"

const examSchema: Schema<ExamDocument> = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    examId: {
        type: mongoose.Schema.Types.String,
        unique: true,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    batchId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    examDate: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
    }
})

examSchema.methods.setExamId = function(this: ExamDocument): void {
    this.examId = "EXM"+generateRandomString(5) + (Math.floor(Math.random() * 100000) + 1)
}

examSchema.pre<ExamDocument>("save", function(next){
    this.setExamId()
    next()
})

const Exam = model<ExamDocument>("exams", examSchema)
export default Exam