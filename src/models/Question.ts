import mongoose, { Schema, model } from "mongoose";
import { QuestionDocument } from "../types";
import { generateRandomString } from "../utils";


const questionSchema: Schema<QuestionDocument> = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    questionId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    examId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    question: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    options: {
        type: [mongoose.Schema.Types.Mixed],
        required: true,
    },
    answer: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }
})


questionSchema.methods.setQuestionId = function(this: QuestionDocument): void {
    this.questionId = "QUE"+generateRandomString(5) + (Math.floor(Math.random() * 100000) + 1)
}

questionSchema.pre<QuestionDocument>("save", function(next){
    this.setQuestionId()
    next()
})

const Question = model<QuestionDocument>("questions", questionSchema)
export default Question