import bcrypt from "bcrypt"
import mongoose, { Schema, model } from "mongoose"
import { AdminDocument } from "../types"
import { generateRandomString } from "../utils"

const adminSchema: Schema<AdminDocument> = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    adminId: {
        type: mongoose.Schema.Types.String,
    },
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        required: true,
        default: Date.now 
    }
})

adminSchema.pre<AdminDocument>("save", function(next){
    this.setAdminId()
    next()
})

adminSchema.methods.setAdminId = function(this: AdminDocument): void {
    this.adminId = "ADM"+generateRandomString(5)+ (Math.floor(Math.random() * 100000) + 1)
}

adminSchema.methods.setPassword = function (this: AdminDocument, plainPassword: string): void {
    this.password = bcrypt.hashSync(plainPassword, 10)
}

adminSchema.methods.verifyPassword = function (this: AdminDocument, plainPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, this.password)
}

const Admin = model<AdminDocument>("admins", adminSchema)
export default Admin

