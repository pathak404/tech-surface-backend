import mongoose, { Model, Schema, model } from "mongoose"
import { StudentDocument } from "../types"
import { generateRandomString } from "../utils"


const studentSchema: Schema<StudentDocument> = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    phone: {
        type: mongoose.Schema.Types.Number,
        required: true,
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
    totalFee: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    joiningDate: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
    }
})


studentSchema.methods.setStudentId = function(this: StudentDocument) : void {
    const nameArr = this.name.split(" ")
    if(this.name.includes(" ")){
        this.studentId = nameArr[0].charAt(0).toUpperCase() + 
        nameArr[nameArr.length-1].charAt(0).toUpperCase() +
        new Date(this.joiningDate).getFullYear() +
        generateRandomString(4)
    }else{
        this.studentId = nameArr[0].charAt(0).toUpperCase() + 
        new Date(this.joiningDate).getFullYear() +
        generateRandomString(4)
    }
}

// automatically set when saving
studentSchema.pre<StudentDocument>("save", function(next){
    this.setStudentId()
    next()
})

const Student = model<StudentDocument>("students", studentSchema)
export default Student
