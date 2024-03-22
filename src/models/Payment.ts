import mongoose, { Schema, model } from "mongoose";
import { PaymentDocument } from "../types";

const paymentSchema : Schema<PaymentDocument> = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    amount: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    method: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    txnId: {
        type: mongoose.Schema.Types.String,
        required: true,
    },    
    description: {
        type: mongoose.Schema.Types.String,
        required: false,
    },
    paidAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    },
})

const Payment = model("Payments", paymentSchema)
export default Payment