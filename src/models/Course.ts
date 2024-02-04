import mongoose, { Schema, model } from "mongoose"
import { CourseDocument } from "../types"
import { generateRandomString } from "../utils"

const courseSchema: Schema<CourseDocument> = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseId: {
        type: mongoose.Schema.Types.String,
        unique: true,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now,
    },
})

courseSchema.methods.setCourseId = function(this: CourseDocument): void {
    this.courseId = "COR"+generateRandomString(5)+ (Math.floor(Math.random() * 100000) + 1)
}

courseSchema.pre<CourseDocument>("save", function(next){
    this.setCourseId()
    next()
})

const Course = model<CourseDocument>("courses", courseSchema)
export default Course
