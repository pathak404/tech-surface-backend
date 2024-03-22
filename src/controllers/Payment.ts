import { NextFunction, Request, Response } from "express";
import Payment from "../models/Payment";
import mongoose from "mongoose";
import { formatDateTime } from "../utils";


export const addPayment = async (req: Request, res: Response) => {
    try{
        const studentId = req.params.studentId
        const { amount, txnId, method, description=null, paidAt=null} = req.body
        if(txnId !== "cash"){
            const isPaid = await Payment.find({txnId}).countDocuments()
            if(isPaid){
                res.sendResponse({message: "Payment exist with this transaction ID"}, 400)
                return;
            }
        }
        
        const payment = new Payment({
            _id: new mongoose.Types.ObjectId(),
            studentId,
            amount,
            txnId,
            method,
            description,
            paidAt,
        })

        const paymentData = await payment.save()
        res.sendResponse({message: "Payment added successfully", payment: paymentData})
    }catch(error){
        console.log(error)
        res.sendResponse({
            message: "Error occurs while adding new payment"
        }, 500)
    }
}


export const getPayments = async (req: Request, res: Response) => {
    try{
        const studentId = req.params.studentId
        const payments = await Payment.find({studentId})
        const rearrangePayments = payments.map((payment) => ({
            txnId: payment.txnId,
            amount: payment.amount,
            method: payment.method,
            description: payment.description,
            paidAt: formatDateTime(payment.paidAt),
        }))
        res.sendResponse({message: "Payments fetched successfully", payments: rearrangePayments})
    }catch(error){
        console.log(error)
        res.sendResponse({
            message: "Error occurs while fetching payments"
        }, 500)
    }
}